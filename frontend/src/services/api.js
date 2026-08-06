import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-focus-room.onrender.com",
});

export default api;