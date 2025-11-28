import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

// Tambahkan module augmentation agar session.user.id dikenal oleh TypeScript
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      // pastikan user tidak undefined
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },

  // pages frontend
  pages: {
    signIn: "/auth/signin", // pastikan ada halaman ini di /pages/auth/signin.tsx
  },
};

export default NextAuth(authOptions);
