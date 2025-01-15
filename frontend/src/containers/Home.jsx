import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { deleteBook, getBook, getHello } from "./Api/Api"; // Adjust the path to where your getHello function is located
import { BasicNavigationBar } from "./component/BasicNavigationBar";
import { SimpleDialog } from "./component/SimpleDialog";

export const Home = () => {
  const [hello, setHello] = useState("");
  const [currentID, setCurrentID] = useState("");
  const [currentMode, setCurrentMode] = useState("");
  const [currentBook, setBook] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [closeDialog, setCloseDialog] = useState(false);
  const [currentData, setCurrentData] = useState([]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const helloData = await getHello();
        const bookData = await getBook();
        setBook(bookData);
        setHello(helloData);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (id) => {
    console.log("Update item with ID:", id);
    setCurrentMode("Update");
    setCurrentID(id);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    console.log("Delete item with ID:", id);
    deleteBook(id);
  };

  return (
    <>
      <BasicNavigationBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Mods</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentBook?.map((x, k) => (
                <TableRow key={k}>
                  <TableCell component="th" scope="row">
                    {k + 1}
                  </TableCell>
                  <TableCell align="right">{x?.title}</TableCell>
                  <TableCell align="right">{x?.rating}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleUpdate(x.id)}
                    >
                      <BrowserUpdatedIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(x.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
      </div>
      <SimpleDialog
        open={openDialog}
        onClose={handleCloseDialog}
        mode={currentMode}
        id={currentID}
      />
    </>
  );
};
