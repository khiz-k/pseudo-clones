import axios from "axios";

const instance = axios.create({
  baseURL: "https://khiz-tiktok-mern-backend.herokuapp.com/",
});

export default instance;
