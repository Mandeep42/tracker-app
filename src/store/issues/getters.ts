import { GetterTree } from "vuex";
import { RootState } from "@/store/types";
import { GetterTypes } from "./getter-types";
import { State } from "./state";
import { Issue } from "./types";

export type Getters = {
  [GetterTypes.GET_ISSUES](state: State): Array<Issue> | [];
};

export const getters: GetterTree<State, RootState> = {
  [GetterTypes.GET_ISSUES]: (state) => {
    return state.issues;
  },
};
