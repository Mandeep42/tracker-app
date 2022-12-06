import { httpAxios, methods } from "@/http";
import { User } from "@/types";

// Fetch all users
export const getUsers = () => {
  return httpAxios(methods.GET, `users?`).then((response) => {
    return response;
  });
};

// Login user
export const loginUser = (email: string, password: string) => {
  return httpAxios(
    methods.GET,
    `users?email=${email}&password=${password}`
  ).then((response) => {
    return response;
  });
};

// Create new user
export const createUser = (user: User) => {
  return httpAxios(methods.POST, "users", {
    ...user,
  }).then((response) => {
    return response;
  });
};
