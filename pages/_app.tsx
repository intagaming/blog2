import blogConfig from "blog.config";
import CommonLayout from "components/CommonLayout";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { NavBarEntry } from "types/blog";
import "../styles/globals.css";

export interface PageRequiredProps {
  navBarEntries: NavBarEntry[];
}

const MyApp = ({ Component, pageProps }: AppProps<PageRequiredProps>) => {
  const { blogName } = blogConfig;

  return (
    <>
      <DefaultSeo titleTemplate={`%s | ${blogName}`} defaultTitle={blogName} />
      <ThemeProvider attribute="class">
        <CommonLayout navBarEntries={pageProps.navBarEntries}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </CommonLayout>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
