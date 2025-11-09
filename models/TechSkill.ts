import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
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

const Skill =
  mongoose.models.Skill ||
  mongoose.model(process.env.NEXT_PUBLIC_TECH_SKILL as string, skillSchema);

export default Skill;
