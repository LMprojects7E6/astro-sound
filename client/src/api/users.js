import api from "./api";

//!GET ALL USER PLAYLISTS
export const getUser = async () => {
  const response = await api.get("/users");
  return response.data;
};

//!POST CREATE NEW USER
export const registerUser = async (data) => {
  const response = await api.post("/users", data);
  return response.data;
};

//!PUT UPDATE USER
export const updateUser = async (data) => {
  const response = await api.put("/users", data);
  return response.data;
};
