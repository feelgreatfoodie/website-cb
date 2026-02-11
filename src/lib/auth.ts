import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const ALLOWED_EMAIL = 'christianbourlier@gmail.com';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ profile }) {
      return profile?.email === ALLOWED_EMAIL;
    },
    async session({ session }) {
      return session;
    },
  },
});
