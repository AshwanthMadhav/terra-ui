import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       // handle unauthorized error
//       throw err;
//     } else if (error.response.status === 404) {
//       // handle not found error
//       throw err;
//     } else {
//       // handle other errors
//       throw err;
//     }
//     return Promise.reject(error);
//   }
// );
export default axiosBase;
