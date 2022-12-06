import { ActionTree, Commit } from "vuex";
import { State } from "./state";
import { RootState } from "@/store/types";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { User } from "./types";

export const actions: ActionTree<State, RootState> = {
  // Set users
  [ActionTypes.SET_USERS]({ commit }: { commit: Commit }, users: Array<User>) {
    commit(MutationTypes.SET_USERS, users);
  },

  // Ad new user
  [ActionTypes.ADD_USER]({ commit }: { commit: Commit }, user: User) {
    commit(MutationTypes.ADD_USER, user);
  },

  // Delete user
  [ActionTypes.DELETE_USER]({ commit }: { commit: Commit }, id: string) {
    commit(MutationTypes.DELETE_USER, id);
  },

  // Delete user
  [ActionTypes.SET_AUTH_DETAILS]({ commit }: { commit: Commit }, user: User) {
    commit(MutationTypes.SET_AUTH_DETAILS, user);
  },
};
