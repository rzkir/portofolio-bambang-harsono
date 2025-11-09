interface Framework {
  title: string;
  imageUrl: string;
}

interface projects {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  thumbnail: string;
  imageUrl: string[];
  previewLink: string;
  frameworks: Framework[];
  createdAt?: Date;
  updatedAt?: Date;
}

//================== Delete Modal ==================//

interface DeleteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
}

//================== Form Modal ==================//

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  formData: projects;
  setFormData: React.Dispatch<React.SetStateAction<projects>>;
  categories: string[];
  frameworks: Framework[];
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isUploading: boolean;
  isSubmitting: boolean;
}

//================== View Modal ==================//
interface ViewProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProject: projects | null;
}

//================== Projects Details ==================//

interface RelatedProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  previewLink: string;
}

interface ProjectDetails {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  thumbnail: string;
  imageUrl: string[];
  previewLink: string;
  frameworks: Framework[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
  relatedProjects: RelatedProject[];
}
