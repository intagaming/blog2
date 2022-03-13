import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import blogConfig from "blog.config";
import CommonLayout from "components/CommonLayout";
import { NavBarEntry } from "types/blog";

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
