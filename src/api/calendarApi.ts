import axios, { InternalAxiosRequestConfig } from "axios";
import { getEnvVariables } from "../helpers";

const {VITE_API_URL}=getEnvVariables()

const calendarApi = axios.create({
  baseURL:VITE_API_URL
})

//configurar interceptores
calendarApi.interceptors.request.use((config:any)=>{
  config.headers={
    ...config.headers,
    'x-token':localStorage.getItem('token')
  }

  return config
})


export default calendarApi


