import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <RecoilRoot>
                <Head>
                    <title>Spotify Clone</title>
                </Head>
                <Component {...pageProps} />
            </RecoilRoot>
        </SessionProvider>
    );
}
 