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
