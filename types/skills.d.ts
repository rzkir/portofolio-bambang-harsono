interface Skill {
  _id?: string;
  imageUrl: string;
  title: string;
}

interface UploadProgress {
  fileName: string;
  progress: number;
  status: "uploading" | "success" | "error";
}

interface PendingUpload {
  file: File;
  imageUrl: string;
  title: string;
}
