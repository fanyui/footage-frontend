import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions, Session, User, getServerSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from "next-auth/providers/credentials"

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

export const BASE_AUTH_OPTIONS = {
  session: {
    strategy: "jwt",  
  },
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/signup",
  },
  callbacks: {
    // we need to put session callback here to include user id in session
    // when we retrieve session from `getServerSession`
    async jwt({ token, user }: { token: JWT; user: User }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.createdAt = user.createdAt;
      }
      return token
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.accessToken = token.accessToken;
      session.user.role = token.role;
      session.user.createdAt = token.createdAt;

      return session
    }
  },
} as const;

export function getAuthSession(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<Session | null> {
  return getServerSession(...args, BASE_AUTH_OPTIONS);
}

export const authOptions: NextAuthOptions = {
  ...BASE_AUTH_OPTIONS,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: 'credentials',
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password }: any = credentials;

        const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            email,
            password
          }),
          headers: { "Content-Type": "application/json" }
        })
        const { access_token, user } = await res.json();
        
        // If no error and we have user data, return it
        if (res.ok && user) {
          const newUser = {...user, accessToken: access_token}
          return newUser
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
}