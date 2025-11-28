import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },

  pages: {
    signIn: "/api/auth/signin",
  },
});

export default handler;
