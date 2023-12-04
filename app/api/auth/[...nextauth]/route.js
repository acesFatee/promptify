import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@/utils/models/UserModel";
import { connectToMongo } from "@/utils/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }

        return session;
      } catch (error) {
        console.log("Error finding user in session callback: ", error.message);
        return session;
      }
    },

    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToMongo();
        const userExists = await User.find({ email: profile.email });
        
        if (userExists.length === 0) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
