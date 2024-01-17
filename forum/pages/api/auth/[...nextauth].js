import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "11719a317ae76738386a",
      clientSecret: "204ab9f983114f9b87643b09ee56c318f3ff6de3",
    }),
  ],

  jwt: {
    maxAge: 60,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("account", account);
      console.log("user", user);
      console.log("token", token);

      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at,
          user,
        };
      }

      let 남은시간 = token.accessTokenExpires - Math.round(Date.now() / 1000);
      if (남은시간 < 60 * 60 * 8 - 10) {
        console.log("유효기간 얼마안남음");
        let 새로운JWT = await refreshAccessToken(token);
        console.log("새로운 JWT : ", 새로운JWT);
        return 새로운JWT;
      } else {
        return token;
      }
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      return session;
    },
  },
  secret: "password1234",
};
export default NextAuth(authOptions);
