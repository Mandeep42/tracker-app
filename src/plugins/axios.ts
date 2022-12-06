import axios from "axios";
import type { App } from "vue";

interface AxiosOptions {
  baseUrl?: string;
  token?: string;
}

export default {
  install: (app: App, options: AxiosOptions) => {
    app.config.globalProperties.$axios = axios.create({
      baseURL: options.baseUrl,
      headers: {
        "Content-type": "application/json",
        Authorization: options.token ? `Bearer ${options.token}` : "",
      },
    });
  },
};
