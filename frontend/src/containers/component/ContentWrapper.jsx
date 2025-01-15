import React from "react";
import { Box, BoxProps, useTheme, useThemeProps } from "@mui/material";

// interface ContentWrapperProps extends BoxProps {
//   maxWidth?: number | string; // Allows setting a custom max width
// }

export const ContentWrapper =
  () =>
  ({
    children,
    maxWidth = "lg", // Default max width
    sx = {},
    ...rest
  }) => {
    //   const theme = useThemeProps();

    return (
      <Box
        sx={{
          // maxWidth:
          //   typeof maxWidth === "string"
          //     ? theme.breakpoints.values[maxWidth]
          //     : maxWidth,
          margin: "0 auto",
          // padding: theme.spacing(2),
          ...sx,
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  };
