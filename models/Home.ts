import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    links: {
      type: [
        {
          label: {
            type: String,
            required: true,
          },
          href: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const modelName = process.env.NEXT_PUBLIC_HOME as string;

if (mongoose.models[modelName]) {
  delete mongoose.models[modelName];
}

export const Home = mongoose.model(modelName, homeSchema);
