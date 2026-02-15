import type { Metadata } from "next";
import { Box } from "@mui/material";
import Providers from "./providers";
import Sidebar from "../components/Navbar";
import InProgressDialog from "./landing-page/components/dialog/InProgressDialog";

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
          <InProgressDialog />
          <Box sx={{ display: "flex", minHeight: "100dvh" }}>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                px: { xs: 2, md: 6 },
                py: { xs: 2, md: 6 },
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
