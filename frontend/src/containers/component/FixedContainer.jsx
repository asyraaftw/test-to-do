import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { SimpleDialog } from "./SimpleDialog";

export const FixedContainer = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="100%">
        <TextField id="standard-basic" label="Standard" variant="standard" />
        {/* <Box sx={{ bgcolor: "#A9A9A9", height: "100vh" }} /> */}
      </Container>
    </React.Fragment>
    // <React.Fragment>
    //   <CssBaseline />
    //   <Container fixed>
    //     <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} />
    //   </Container>
    // </React.Fragment>
  );
};
