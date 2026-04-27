import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

// In a real app, you'd validate against a database.
// This mock accepts any email/password combination where password is 6+ chars.
const MOCK_USERS = [
  { id: "1", name: "Demo User", email: "demo@eaglepredict.com", password: "demo123", role: "premium" },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Mock: accept demo user or any user that "registers"
        const user = MOCK_USERS.find((u) => u.email === credentials.email);
        if (user && credentials.password === user.password) {
          return { id: user.id, name: user.name, email: user.email };
        }

        // For demo purposes, allow any valid-looking credentials
        if (credentials.password.length >= 6) {
          return {
            id: Date.now().toString(),
            name: credentials.email.split("@")[0],
            email: credentials.email,
          };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
