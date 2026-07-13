import NextAuth, { DefaultSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Tambahkan module augmentation agar session.user.id dikenal oleh TypeScript
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export default NextAuth(authOptions);
