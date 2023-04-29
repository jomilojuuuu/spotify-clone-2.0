import SpotifyApi, { LOGIN_URL } from "@/LIB/spotify"
import { Session } from "inspector";
import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

async function refreshAccessToken(token) {
  try {

    SpotifyApi.setAccessToken(token.accessToken);
    SpotifyApi.setRefreshToken(token.refreshToken); 

    const {body: refreshedToken} = await SpotifyApi.refreshAccessToken();
    console.log("REFRESHED TOKEN IS", refreshToken);


    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,

    }

  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRETE,
  Pages: {
    signIin: '/Login'
  },
  callbacks: {
    async jwt({token,account,user}) { 
      //initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000
        }
      }

      //return the previous token if it has nt expeired
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING ACCESS TOKEN IS VALID")
        return token;
      }

      console.log("ACCESS TOKEN HAS EXPEIRED, REFRESHING...")
      return await refreshAccessToken(token)
    },
    async Session({session, token}) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username =token.username;

      return session;
    }
  }
}

export default NextAuth(authOptions)