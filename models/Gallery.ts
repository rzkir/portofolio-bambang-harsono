import mongoose from "mongoose";

export interface IGallery extends mongoose.Document {
  imageUrl: string;
  title: string;
}

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const modelName = process.env.NEXT_PUBLIC_GALLERY as string;

const Gallery =
  (mongoose.models[modelName] as mongoose.Model<IGallery>) ||
  mongoose.model<IGallery>(modelName, gallerySchema);

export default Gallery;
