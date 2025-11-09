"use client";

import { useState, useEffect } from "react";

import { toast } from "sonner";

export function useStateSkill() {
  type SkillItem = { title: string; description: string };
  type SkillContent = { _id?: string; title: string; text: string; skills: SkillItem[] };

  const [contents, setContents] = useState<SkillContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<SkillContent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<SkillContent>({
    title: "",
    text: "",
    skills: [{ title: "", description: "" }],
  });

  // Fetch contents on component mount
  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/skills", {
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
    setFormData({
      title: "",
      text: "",
      skills: [{ title: "", description: "" }],
    });
    setIsOpen(true);
  };

  const handleEdit = (content: SkillContent) => {
    setSelectedContent(content);
    setFormData({
      ...content,
      skills: content.skills && content.skills.length > 0 ? content.skills : [{ title: "", description: "" }],
    });
    setIsOpen(true);
  };

  const handleDelete = (content: SkillContent) => {
    setSelectedContent(content);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const submitData = { ...formData };

      if (selectedContent) {
        const response = await fetch("/api/skills", {
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
        const response = await fetch("/api/skills", {
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
      fetchContents();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsSubmitting(true);
      if (selectedContent?._id) {
        const response = await fetch(`/api/skills?id=${selectedContent._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
          },
        });

        if (!response.ok) throw new Error("Failed to delete content");

        toast.success("Content deleted successfully");
        setIsDeleteOpen(false);
        fetchContents();
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
    formData,
    setFormData,
    // Functions
    handleCreate,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleDeleteConfirm,
  };
}
