import "./styles.css";
import Head from "next/head";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="msapplication-TileColor" content="#00aba9" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#e4e1ec" />
                <meta name="description" content="Simple trivia app" />
                <title>Trivia App</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
