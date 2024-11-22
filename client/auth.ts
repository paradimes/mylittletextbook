// client/auth.ts
import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Auth0],
});
