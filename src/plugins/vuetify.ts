// import Vue from "vue";
// import Vuetify from "vuetify/lib/framework";

// Vue.use(Vuetify);

// const opts = {};

// export default new Vuetify(opts);

// Vuetify
import "vuetify/styles";
import { createVuetify, IconOptions, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const lightTheme: ThemeDefinition = {
  dark: false,
  variables: {},
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#1867c0",
    secondary: "#6c757d",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    danger: "#dc3545",
    light: "#EEEEEE",
    error: "#B00020",
  },
};

// import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { mdi } from "vuetify/iconsets/mdi";
import { aliases, fa } from "vuetify/iconsets/fa";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "lightTheme",
    themes: {
      lightTheme: lightTheme,
    },
  },
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
});
