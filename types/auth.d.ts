type UserRole = "admins" | "user";

interface UserSession {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  userRole: UserRole | null;
  signIn: (email: string, password: string) => Promise<UserSession | undefined>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<boolean>;
  resetToken: string | null;
  setResetToken: (token: string | null) => void;
  verifyOtp: (token: string) => Promise<void>;
  finalizeResetPassword: (newPassword: string) => Promise<void>;
}
