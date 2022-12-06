import axios, { Method } from "axios";

export const httpAxios = async function (
  method: string,
  url: string,
  data?: any
) {
  const options = {
    token: null,
  };

  return await axios({
    method: method,
    baseURL: import.meta.env.VITE_API_URL || "/",
    url: url,
    timeout: 30000,
    timeoutErrorMessage: "Request Time out",
    headers: {
      "Content-type": "application/json",
      Authorization: options.token ? `Bearer ${options.token}` : "",
    },
    data: data,
  }).catch(function (error) {
    console.log("There was an error :", error);
  });
};

export const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  OPTIONS: "OPTIONS",
  // | 'patch' | 'PATCH'
  // | 'purge' | 'PURGE'
  // | 'link' | 'LINK'
  // | 'unlink' | 'UNLINK';
};
