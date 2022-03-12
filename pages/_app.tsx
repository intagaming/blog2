import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import blogConfig from "blog.config";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { blogName } = blogConfig;

  return (
    <>
      <DefaultSeo titleTemplate={`%s | ${blogName}`} defaultTitle={blogName} />
      <ThemeProvider attribute="class">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
