import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "./state";
import { User } from "./types";

export type Mutations<S = State> = {
  [MutationTypes.SET_USERS](state: S, users: Array<User>): void;
  [MutationTypes.ADD_USER](state: S, user: User): void;
  [MutationTypes.DELETE_USER](state: S, id: string): void;
  [MutationTypes.SET_AUTH_DETAILS](state: S, user: User): void;
};

// Set users
export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USERS](state: State, users: Array<User>) {
    state.users = [...users];
  },

  // Add user
  [MutationTypes.ADD_USER](state: State, user: User) {
    state.users.push(user);
  },

  // Delete user
  [MutationTypes.DELETE_USER](state: State, id: string) {
    state.users = state.users.filter((user) => user.id !== id);
  },

  // Delete user
  [MutationTypes.SET_AUTH_DETAILS](state: State, user: User) {
    state.authDetails = user;
  },
};
