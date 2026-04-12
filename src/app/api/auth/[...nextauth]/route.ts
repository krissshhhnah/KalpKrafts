import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.passwordHash) return null;
        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;
        return { id: user._id.toString(), email: user.email, name: user.name, image: user.image };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // Create a new user record on first OAuth login
        await User.create({
          name: user.name || 'Developer',
          email: user.email,
          image: user.image,
          oAuthId: account?.providerAccountId,
          oAuthProvider: account?.provider as 'google' | 'github',
        });
      }
      return true;
    },

    async session({ session }) {
      // Hydrate the session with DB data
      if (session?.user?.email) {
        await dbConnect();
        const dbUser = await User.findOne({ email: session.user.email }).lean();
        if (dbUser) {
          (session.user as any).id = (dbUser as any)._id.toString();
          (session.user as any).tier = (dbUser as any).subscriptionTier;
          (session.user as any).queriesRemaining = (dbUser as any).aiQueriesRemaining;
        }
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/register',
    error: '/auth/error',
  },

  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
