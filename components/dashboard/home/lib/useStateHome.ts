"use client";

import { useState, useEffect } from "react";

import { toast } from "sonner";

export function useStateHome() {
  const [contents, setContents] = useState<HomeContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<HomeContent | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formData, setFormData] = useState<HomeContent>({
    title: "",
    description: "",
    email: "",
    links: [{ label: "", href: "" }],
    name: "",
    text: "",
    image: "",
  });

  // Fetch contents on component mount
  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/home", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
        },
      });
      const data = await response.json();
      setContents(data);
    } catch {
      toast.error("Failed to fetch contents");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedContent(null);
    setSelectedImage(null);
    setImagePreview(null);
    setFormData({
      title: "",
      description: "",
      email: "",
      links: [{ label: "", href: "" }],
      name: "",
      text: "",
      image: "",
    });
    setIsOpen(true);
  };

  const handleEdit = (content: HomeContent) => {
    setSelectedContent(content);
    setSelectedImage(null);
    setImagePreview(content.image || null);
    setFormData({
      ...content,
      links:
        content.links && content.links.length > 0
          ? content.links
          : [{ label: "", href: "" }],
    });
    setIsOpen(true);
  };

  const handleDelete = (content: HomeContent) => {
    setSelectedContent(content);
    setIsDeleteOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/home/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Upload image if new image is selected
      let imageUrl = formData.image;
      if (selectedImage) {
        setIsUploadingImage(true);
        imageUrl = await uploadImage(selectedImage);
        setIsUploadingImage(false);
      }

      const submitData = {
        ...formData,
        image: imageUrl,
      };

      if (selectedContent) {
        // Update content
        const response = await fetch("/api/home", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
          },
          body: JSON.stringify({
            id: selectedContent._id,
            ...submitData,
          }),
        });

        if (!response.ok) throw new Error("Failed to update content");
        toast.success("Content updated successfully");
      } else {
        // Create content
        const response = await fetch("/api/home", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
          },
          body: JSON.stringify(submitData),
        });

        if (!response.ok) throw new Error("Failed to create content");
        toast.success("Content created successfully");
      }
      setIsOpen(false);
      setSelectedImage(null);
      setImagePreview(null);
      fetchContents(); // Refresh the list
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
      setIsUploadingImage(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsSubmitting(true);
      if (selectedContent?._id) {
        const response = await fetch(`/api/home?id=${selectedContent._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
          },
        });

        if (!response.ok) throw new Error("Failed to delete content");

        toast.success("Content deleted successfully");
        setIsDeleteOpen(false);
        fetchContents(); // Refresh the list
      }
    } catch {
      toast.error("Failed to delete content");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    contents,
    selectedContent,
    isSubmitting,
    isOpen,
    setIsOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    isLoading,
    selectedImage,
    setSelectedImage,
    imagePreview,
    setImagePreview,
    isUploadingImage,
    formData,
    setFormData,
    // Functions
    handleCreate,
    handleEdit,
    handleDelete,
    handleImageChange,
    handleSubmit,
    handleDeleteConfirm,
  };
}
