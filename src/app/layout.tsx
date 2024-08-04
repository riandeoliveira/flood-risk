import "@/styles/globals.css";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactElement, ReactNode } from "react";
import "react-modern-drawer/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./providers";

type RootLayoutProps = {
  children: ReactNode;
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FloodRisk",
  description:
    "Aplicação pública destinada a identificar e alertar sobre potenciais áreas de risco de alagamentos por todo o território brasileiro.",
  keywords: ["brazil", "hackathon", "javascript", "nextjs", "react", "tailwindcss", "typescript"],
};

const RootLayout = ({ children }: RootLayoutProps): ReactElement => {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
            <Providers />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
