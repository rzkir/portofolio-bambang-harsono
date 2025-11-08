"use client";

import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";

export function useStateSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Skill>({ imageUrl: "", title: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(skills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSkills = skills.slice(startIndex, endIndex);

  useEffect(() => {
    void fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/skills", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
        },
      });
      const data = await response.json();
      setSkills(data);
    } catch {
      toast.error("Failed to fetch skills");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    await handleMultipleFileUpload(files);
  };

  const handleMultipleFileUpload = async (files: File[]) => {
    const uploadPromises = files.map(async (file) => {
      try {
        setUploadProgress((prev) => [
          ...prev,
          { fileName: file.name, progress: 0, status: "uploading" },
        ]);

        const fd = new FormData();
        fd.append("file", file);

        const response = await fetch("/api/skills/upload", {
          method: "POST",
          body: fd,
        });

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();

        const fileName = file.name.split(".")[0];
        const formattedTitle = fileName
          .split(/[-_]/)
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");

        setPendingUploads((prev) => [
          ...prev,
          { file, imageUrl: data.url, title: formattedTitle },
        ]);

        setUploadProgress((prev) =>
          prev.map((item) =>
            item.fileName === file.name
              ? { ...item, progress: 100, status: "success" }
              : item
          )
        );

        return data;
      } catch (error) {
        setUploadProgress((prev) =>
          prev.map((item) =>
            item.fileName === file.name ? { ...item, status: "error" } : item
          )
        );
        throw error;
      }
    });

    try {
      await Promise.all(uploadPromises);
      toast.success(
        "Files uploaded successfully. Click Create to save to database."
      );
    } catch {
      toast.error("Some files failed to upload");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      if (isEditing) {
        const response = await fetch(`/api/skills?id=${formData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl: pendingUploads[0].imageUrl,
            title: pendingUploads[0].title,
          }),
        });

        if (!response.ok) throw new Error("Failed to update skill");
        toast.success("Skill updated successfully");
      } else {
        const savePromises = pendingUploads.map(async (upload) => {
          const response = await fetch("/api/skills", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              imageUrl: upload.imageUrl,
              title: upload.title,
            }),
          });
          if (!response.ok) throw new Error("Failed to save skill");
          return response.json();
        });

        await Promise.all(savePromises);
        toast.success("All skills created successfully");
      }

      setIsEditing(false);
      setIsDialogOpen(false);
      setFormData({ imageUrl: "", title: "" });
      setPendingUploads([]);
      setUploadProgress([]);
      void fetchSkills();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save skills"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/skills?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete skill");
      toast.success("Skill deleted successfully");
      void fetchSkills();
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete skill");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (data: Skill) => {
    setFormData(data);
    setPendingUploads([
      {
        file: new File([], data.title),
        imageUrl: data.imageUrl,
        title: data.title,
      },
    ]);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  return {
    // lists & pagination
    skills,
    isLoading,
    currentSkills,
    totalPages,
    currentPage,
    setCurrentPage,
    // dialog & edit
    isDialogOpen,
    setIsDialogOpen,
    isEditing,
    setIsEditing,
    handleEdit,
    // deletion
    openDeleteDialog,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    deleteId,
    setDeleteId,
    isDeleting,
    handleDelete,
    // form submit
    isSubmitting,
    handleSubmit,
    // drag & drop upload UI
    dropZoneRef,
    fileInputRef,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    pendingUploads,
    setPendingUploads,
    uploadProgress,
    setUploadProgress,
    isUploading,
    // expose helpers if ever needed
    handleMultipleFileUpload,
  } as const;
}
