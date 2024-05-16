import axios from "axios";

const BASE_URL = import.meta.env.API_URL || "https://api.sampleapis.com/";

const RestClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default RestClient;
