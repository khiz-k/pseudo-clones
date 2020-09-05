import axios from "axios";

const instance = axios.create({
  baseURL: "your own backend",
});

export default instance;
