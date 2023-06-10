import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 24 hour
  },
  jwt: {
    secret: process.env.JWT_SIGNIN_PRIVATE_KEY,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.username && !credentials?.password) {
          throw new Error("error");
        }

        let res;

        try {
          res = await fetch(`${process.env.APP_API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json;charset=UTF-8" },
          });
        } catch (error) {
          console.log("erro", error);
        }
        const user = await res?.json();
        if (res?.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.username = user.name;
        token.privilege = user.privilege;
        token.accessToken = user.token;
        token.id = user.id;
        token.companies = user.companies;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.name = token.name;
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
        session.user.privilege = token.privilege;
        session.user.email = "não informado";
        session.user.image = "não informado";
        session.user.companies = token.companies ?? [];
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
