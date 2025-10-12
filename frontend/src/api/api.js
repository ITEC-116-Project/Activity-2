import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/act2", // backend URL
});

// Auth endpoints
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Notes endpoints
export const getNotes = (userId) => API.get(`/notes/${userId}`);
export const addNote = (data) => API.post("/notes", data);
export const updateNote = (id, data) => API.put(`/notes/${id}`, data);
export const deleteNote = (id) => API.delete(`/notes/${id}`);

export default API;


