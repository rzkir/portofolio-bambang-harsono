import { z } from "zod";

// Strict email validation regex
const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .toLowerCase()
    .trim()
    .regex(
      emailRegex,
      "Invalid email format. Please use a valid email address (e.g., user@domain.com)"
    ),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;

// Forgot Password (request OTP) schema
export const forgotPasswordEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .toLowerCase()
    .trim()
    .regex(
      emailRegex,
      "Invalid email format. Please use a valid email address (e.g., user@domain.com)"
    ),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordEmailSchema>;

// OTP verification schema
export const otpSchema = z.object({
  token: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export type OtpFormData = z.infer<typeof otpSchema>;

// Reset Password schema
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
