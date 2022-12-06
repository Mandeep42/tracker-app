import { Module } from "vuex";
import { state, State } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { RootState } from "@/store/types";

// export default {
//   state,
//   getters,
//   mutations,
//   actions,
// };

const namespaced = true;
export const issues: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
