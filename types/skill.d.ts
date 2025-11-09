interface SkillItem {
  title: string;
  description: string;
}

interface SkillContent {
  _id?: string;
  title: string;
  text: string;
  skills: SkillItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

type SkillProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedContent: SkillContent | null;
  formData: SkillContent;
  setFormData: (data: SkillContent) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  triggerButton: React.ReactNode;
};
