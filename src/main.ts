import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import router from "./router";
import { store } from "./store";
import FontAwesomeIcon from "./plugins/fontawesome-icons";
// import axios from "./plugins/axios";

// Create app instance
const app = createApp(App);

// Register font-awesome-icon
app.component("font-awesome-icon", FontAwesomeIcon);

// app.use(axios, {
//   baseUrl: "http://localhost:3000/",
// });

// Register packages
app.use(i18n).use(vuetify).use(router).use(store);

app.mount("#app");
