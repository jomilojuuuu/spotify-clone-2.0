import { Session } from "@/types/session";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const SpotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
});

function useSpotify() {
    const { data, status } = useSession();
    const session = data as Session;

    useEffect(() => {
        if (session) {
            if (session.error === "RefreshAccessTokenError") {
                signIn();
            }
            SpotifyApi.setAccessToken(session?.user?.accessToken || "");
        }
    }, [session]);

    return SpotifyApi;
}

export default useSpotify;
