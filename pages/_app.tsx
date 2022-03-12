import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class">
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
