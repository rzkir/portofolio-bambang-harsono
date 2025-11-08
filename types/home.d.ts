interface LinkItem {
  label: string;
  href: string;
}

interface HomeContent {
  _id?: string;
  account_id?: string;
  title: string;
  description: string;
  email: string;
  links: LinkItem[];
  name: string;
  text: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

interface FormModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedContent: HomeContent | null;
  formData: HomeContent;
  setFormData: (data: HomeContent) => void;
  imagePreview: string | null;
  setSelectedImage: (file: File | null) => void;
  setImagePreview: (preview: string | null) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isUploadingImage: boolean;
  triggerButton: React.ReactNode;
}
