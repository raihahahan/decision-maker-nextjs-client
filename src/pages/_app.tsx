import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ReduxProvider } from "../redux/store";
import SiteLayout from "../features/site/site-layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { makeSiteTitle, siteTitleNames } from "../features/site/site-utils";
import { routes } from "../features/site/site-types";
import "../styles/globals.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const route = useRouter();
  const [siteTitle, setSiteTitle] = useState("Make My Decision");

  useEffect(() => {
    setSiteTitle(makeSiteTitle(siteTitleNames[route.pathname as routes]));
  }, [route.pathname]);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
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
