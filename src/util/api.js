import axiosBase from "./axios_base";

export const registerApi = async (email, password) => {
  try {
    console.log("email");
    console.log(email);
    const response = await axiosBase.post(`/api/auth/register`, {
      email,
      password,
    });
    return response;
  } catch (e) {
    throw e;
  }
};

export const loginApi = async (email, password) => {
  try {
    const response = await axiosBase.post(`/api/auth/login`, {
      email,
      password,
    });
    return response;
  } catch (e) {
    throw e;
  }
};
export const getAssets = async () => {
  try {
    const response = await axiosBase.get(`/api/assets`);
    return response;
  } catch (e) {
    throw e;
  }
};
