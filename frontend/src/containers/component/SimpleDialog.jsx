import {
  Dialog,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createBook, updateBook } from "../Api/Api";

export const SimpleDialog = (props) => {
  const {
    onClose,
    selectedValue,
    open,
    value,
    id,
    mode,
    currentData,
    fetchData,
  } = props;

  const [bookData, setBookData] = useState({
    title: "",
    rating: "",
  });

  useEffect(() => {
    if (currentData) {
      setBookData({
        id: currentData.id || "",
        title: currentData.title || "",
        rating: currentData.rating || "",
      });
    }
  }, [currentData]);

  const handleSubmit = async () => {
    console.log("Book Title:", bookData.title);
    console.log("Rating:", bookData.rating);
    console.log("Mode:", mode);
    if (mode === "Add") {
      await createBook(bookData);
    } else {
      await updateBook(id, bookData);
    }

    if (fetchData) {
      await fetchData();
    }
    onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {mode === "Update" ? "Update Book" : "Add Book"}
      </DialogTitle>
      <ListItem key={value}>
        <TextField
          id="title"
          label="Title"
          name="title"
          variant="standard"
          value={bookData?.title}
          onChange={handleChange}
        />
      </ListItem>
      <ListItem key={value}>
        <TextField
          id="rating"
          label="Rating"
          name="rating"
          variant="standard"
          value={bookData?.rating}
          onChange={handleChange}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
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
