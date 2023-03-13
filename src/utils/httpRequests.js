import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = async (data) => {
  return await api.post("/api/get-otp", data);
};
export const verifyOtp = async (data) => {
  return await api.post("/api/verify-otp", data);
};
export const activateAccount = async (data) => {
  return await api.post("/api/activate", data);
};
export const logout = async () => {
  return await api.post("/api/logout");
};
export const createSpace = async (data) => {
  return await api.post("/api/spaces", data);
};
export const getAllSpaces = async () => {
  return await api.get("/api/spaces");
};
export const getSpace = async (spaceId) => {
  return await api.get(`/api/spaces/${spaceId}`);
};

// interceptors
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalReq = error.config;
    if (error.response.status === 401 && originalReq && !originalReq._isRetry) {
      originalReq._isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
          withCredentials: true,
        });
        return api.request(originalReq);
      } catch (err) {
        console.log(err.message);
      }
    }

    throw error;
  }
);

export default api;
