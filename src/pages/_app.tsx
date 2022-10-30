import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ReduxProvider } from "../redux/store";
import SiteLayout from "../features/site/site-layout";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <ReduxProvider>
          <SiteLayout>
            <Component {...pageProps} />
          </SiteLayout>
        </ReduxProvider>
      </MantineProvider>
    </>
  );
}
