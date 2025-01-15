import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import * as React from "react";

export const FixedContainer = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="100%">
        <TextField id="standard-basic" label="Standard" variant="standard" />
        {/* <Box sx={{ bgcolor: "#A9A9A9", height: "100vh" }} /> */}
      </Container>
    </React.Fragment>
  );
};
