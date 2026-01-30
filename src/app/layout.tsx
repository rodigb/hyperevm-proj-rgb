import type { Metadata } from "next";
import { Box } from "@mui/material";
import Providers from "./providers";
import Sidebar from "../components/Navbar";

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
          <Box sx={{ display: "flex", minHeight: "100dvh" }}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                px: { xs: 4, md: 6 },
                py: { xs: 4, md: 6 },
              }}
            >
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
