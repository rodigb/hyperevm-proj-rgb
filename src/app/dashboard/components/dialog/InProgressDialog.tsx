"use client";

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function InProgressDialog() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const dismissed = sessionStorage.getItem("inProgressDialogDismissed");
    if (!dismissed) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("inProgressDialogDismissed", "true");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: `
            repeating-linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.03) 0px,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 5px
            ),
            linear-gradient(180deg, #09121f 0%, #05080f 100%)
          `,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#50d2c1",
          pb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <ConstructionIcon />
          <Typography variant="h6" component="span">
            Work in Progress
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "rgba(244, 246, 255, 0.65)",
            "&:hover": {
              color: "#F4F6FF",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography
          sx={{
            color: "#F4F6FF",
            mb: 2,
            lineHeight: 1.6,
          }}
        >
          This application is currently under active development. Some features
          may be incomplete or subject to change.
        </Typography>
        <Typography
          sx={{
            color: "rgba(244, 246, 255, 0.65)",
            fontSize: "0.875rem",
          }}
        >
          Thank you for your patience as we continue to improve the HyperBoard
          experience...
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            backgroundColor: "#25E6D5",
            color: "#070A12",
            "&:hover": {
              backgroundColor: "#1fc9ba",
            },
          }}
        >
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
}
