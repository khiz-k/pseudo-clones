import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: "https://us-central1-clone-f1c46.cloudfunctions.net/api",
  // ^ you can use my existing one or launch your own and switch details
  // local example, just switch clone-f1c46 and us-central1 with your details: "http://localhost:5001/clone-f1c46/us-central1/api",
});

export default instance;
