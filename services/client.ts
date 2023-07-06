import axios, { AxiosError } from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: { "Content-Type": "application/json" },
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Fetch error:", error);
        const errors = error as Error | AxiosError;
        if(!axios.isAxiosError(error)){
          // do whatever you want with native error
        }
        return Promise.reject(errors);
    }
);

export default instance;
