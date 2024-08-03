// TODO: update metadata

import { LoadingArea } from "@/components/common/loading-area";
import "@/styles/globals.css";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactElement, ReactNode } from "react";
import "react-modern-drawer/dist/index.css";

type RootLayoutProps = {
  children: ReactNode;
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  authors: {
    name: "John Doe",
    url: "https://www.example.com/",
  },
  description: "Lorem Ipsum...",
  keywords: ["javascript", "markdown", "nextjs", "nodejs", "react", "tailwindcss", "typescript"],
  title: "My Project",
};

const RootLayout = ({ children }: RootLayoutProps): ReactElement => {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
            <LoadingArea />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
