import axios from "axios"
import { API } from "../constants/api"


export const HTTP = axios.create({
  baseURL: API,
  withCredentials: true, 
});
