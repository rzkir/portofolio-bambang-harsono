import mongoose from "mongoose";

import bcrypt from "bcryptjs";

export interface IAccount extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "user" | "admins";
  resetToken?: string;
  resetTokenExpiry?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admins"],
      default: "user",
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: process.env.NEXT_PUBLIC_ACCOUNTS, // Explicitly set collection name
  }
);

// Hash password before saving
accountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password
accountSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Prevent OverwriteModelError by checking if model already exists
const modelName = process.env.NEXT_PUBLIC_ACCOUNTS as string;

export const Account =
  mongoose.models[modelName] ||
  mongoose.model<IAccount>(modelName, accountSchema);
