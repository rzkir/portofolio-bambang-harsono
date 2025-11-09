import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    skills: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const modelName = process.env.NEXT_PUBLIC_SKILL as string;

if (mongoose.models[modelName]) {
  delete mongoose.models[modelName];
}

export const Skill = mongoose.model(modelName, skillSchema);
