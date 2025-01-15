import {
  Dialog,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { createBook } from "../Api/Api";

export const SimpleDialog = (props) => {
  const { onClose, selectedValue, open, value, id, mode } = props;
  const [bookData, setBookData] = useState({
    title: "",
    rating: "",
  });
  console.log(id, mode);

  const handleSubmit = () => {
    console.log("Book Title:", bookData.title);
    console.log("Rating:", bookData.rating);
    createBook(bookData);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field (bookTitle or rating)
    }));
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Book List</DialogTitle>
      <ListItem key={value}>
        <TextField
          id="standard-basic"
          label="Title"
          name="title"
          variant="standard"
          value={bookData?.title}
          onChange={handleChange}
        />
      </ListItem>
      <ListItem key={value}>
        <TextField
          id="standard-basic"
          label="Rating"
          name="rating"
          variant="standard"
          value={bookData?.rating}
          onChange={handleChange}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton autoFocus>
          <ListItemText primary={`${mode} Book`} onClick={handleSubmit} />
        </ListItemButton>
      </ListItem>
    </Dialog>
  );
};
