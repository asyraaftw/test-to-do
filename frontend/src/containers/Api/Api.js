import axios from "axios";

const API_URL = "http://localhost:2244/api/";

// Get all todo items
export const getHello = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new todo item
export const addTodoItem = async (todoItem) => {
  const response = await axios.post(API_URL, todoItem);
  return response.data;
};

export const getBook = async () => {
  const response = await axios.get(`${API_URL}book`);
  return response.data;
};

export const getBookByID = async (id) => {
  const response = await axios.get(`${API_URL}book/${id}`);
  return response.data;
};

export const createBook = async (book) => {
  try {
    const response = await axios.post(`${API_URL}book`, book);
    return response.data;
  } catch (error) {
    console.error("There was an error creating the book:", error);
  }
};

export const updateBook = async (id, updatedBook) => {
  try {
    const response = await axios.put(`${API_URL}book/${id}`, updatedBook);
    console.log("Book updated:", response.data); // Handle successful response
    return response.data; // You can return the updated book data
  } catch (error) {
    console.error("Error updating book:", error); // Handle error
    throw error; // Optionally rethrow to handle in component
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}book/${id}`);
    console.log("Book deleted:", response.data); // Handle successful response
    return response.data; // Optionally return the response
  } catch (error) {
    console.error("Error deleting book:", error); // Handle error
    throw error; // Rethrow to handle in component
  }
};
