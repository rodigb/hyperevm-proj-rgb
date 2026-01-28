import type { Metadata } from "next";

import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "HyperEVM Dashboard",
  description: "Track TVL, protocols, and trends on HyperEVM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />

          <Container maxWidth="lg" sx={{ mt: 4, pb: 8 }}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
