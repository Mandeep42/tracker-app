import { GetterTree } from "vuex";
import { RootState } from "@/store/types";
import { GetterTypes } from "./getter-types";
import { State } from "./state";
import { User } from "./types";

export type Getters = {
  [GetterTypes.GET_USERS](state: State): Array<User> | [];
  [GetterTypes.GET_AUTH_DETAILS](state: State): User | null;
};

export const getters: GetterTree<State, RootState> = {
  [GetterTypes.GET_USERS]: (state): Array<User> | undefined => {
    return state.users;
  },
  [GetterTypes.GET_AUTH_DETAILS]: (state): User | undefined => {
    return state.authDetails;
  },
};
