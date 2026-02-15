"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";

const navItems = ["Docs", "Contact", "Designs"];

export default function Topbar() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ ml: 25, mr: 25 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              unoptimized
              src="/robot.gif"
              alt="HyperEVM Logo"
              width={60}
              height={60}
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Hyper<span style={{ color: "#25E6D5" }}>Board</span>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                <Typography variant="button" sx={{ fontWeight: 200 }}>
                  {item}
                </Typography>
              </Button>
            ))}
            <Button variant="contained" color="primary" sx={{ ml: 2 }}>
              <Typography variant="button" sx={{ fontWeight: 200 }}>
                Launch Dashboard
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
