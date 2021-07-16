import { css, Global } from "@emotion/react";
import { DefaultSeo } from "next-seo";

import { ThemeProvider, CSSReset } from "@chakra-ui/react";
import { AuthProvider } from "@/lib/auth";
import theme from "@/styles/theme";
import SEO from "../next-seo.config";

const GlobalStyle = ({ children }) => {
  return (
    <>
      <CSSReset />
      <DefaultSeo {...SEO} />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
