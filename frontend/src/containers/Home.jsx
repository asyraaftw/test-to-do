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
import { deleteBook, getBook, getBookByID, getHello } from "./Api/Api";
import { BasicNavigationBar } from "./component/BasicNavigationBar";
import { SimpleDialog } from "./component/SimpleDialog";

export const Home = () => {
  const [hello, setHello] = useState("");
  const [currentID, setCurrentID] = useState("");
  const [currentMode, setCurrentMode] = useState("");
  const [allBook, setAllBook] = useState([]);
  const [bookByID, setBookByID] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const fetchData = async () => {
    try {
      const helloData = await getHello();
      const bookData = await getBook();
      setAllBook(bookData);
      setHello(helloData);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchBookByID = async (id) => {
    const dataBookByID = await getBookByID(id);
    setBookByID(dataBookByID);
  };

  const handleUpdate = async (id) => {
    if (id) {
      try {
        setCurrentID(id);
        fetchBookByID(id);
        setCurrentMode("Update");
        setOpenDialog(true);
      } catch (err) {
        setError("Failed to delete the book");
        console.error(err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (id) {
      try {
        await deleteBook(id);
        await fetchData();
      } catch (err) {
        setError("Failed to delete the book");
        console.error(err);
      }
    }
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
                <TableCell>#</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Mods</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allBook?.map((x, k) => (
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
      </div>
      <SimpleDialog
        open={openDialog}
        onClose={handleCloseDialog}
        mode={currentMode}
        id={currentID}
        currentData={bookByID}
        fetchData={fetchData}
      />
    </>
  );
};
