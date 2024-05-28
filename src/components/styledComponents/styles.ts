import { Box, outlinedInputClasses, styled, TextField, Typography } from "@mui/material";

export const StyledTypography = styled(Typography)`
  color: white;
  text-align: start;
`;

export const StyledTextField = styled(TextField)`
  & .${outlinedInputClasses.root} {
    border-radius: 20px;
  }
  & .${outlinedInputClasses.input} {
    background-color: white;
  }
`;

export const StyledBox = styled(Box)`
    display: flex;
    gap: 10px;
    width: inherit;
    flex-direction: column;
    margin-top: 15px;
    background-color: white;
    padding: 10px;
`;