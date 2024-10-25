import React from "react";
import Button from "@mui/material/Button";

const MuiButton = ({
  variant = "contained",
  color = "primary",
  size = "medium",
  onClick,
  label, // Accept label prop
  disabled = false,
  startIcon,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      sx={{
        textTransform: "none",
        backgroundColor: "#323232",
        borderRadius: "5px",
        fontWeight: 600,
        fontSize: "14px",
        fontFamily: "Poppins",
        "&:hover": {
          backgroundColor: "#444444", // Optional: change on hover
        },
      }}
    >
      {label} {/* Use label as the button text */}
    </Button>
  );
};

export default MuiButton;
