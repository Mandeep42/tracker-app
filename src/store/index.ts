import { createStore } from "vuex";
import { issues } from "./issues";
import { users } from "./users";

export const store = createStore({
  modules: {
    users: users,
    issues: issues,
  },
});
