import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const MuiInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "5px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#323232",
    },
    "& input": {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "14px",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#323232",
  },
  "& .MuiOutlinedInput-input": {
    padding: "10px", // Adjust padding as needed
  },
}));
