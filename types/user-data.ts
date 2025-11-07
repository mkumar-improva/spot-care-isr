export type UserData = {
  plan: string | null;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profilePicture: string;
  resetToken: string | null;
  resetTokenExpiry: Date | null;
  role: string;
  subscriptionEndDate: Date | null;
  subscriptionStatus: string | null;
  token: string;
};
