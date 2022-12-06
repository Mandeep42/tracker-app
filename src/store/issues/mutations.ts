import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "./state";
import { Issue } from "./types";

export type Mutations<S = State> = {
  [MutationTypes.SET_ISSUES](state: S, issues: Array<Issue>): void;
  [MutationTypes.ADD_ISSUE](state: S, issue: Issue): void;
  [MutationTypes.EDIT_ISSUE](state: S, issue: Issue): void;
  [MutationTypes.DELETE_ISSUE](state: S, id: string): void;
};

// Set issues
export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_ISSUES](state: State, issues: Array<Issue>) {
    state.issues = [...issues];
  },

  // Add issue
  [MutationTypes.ADD_ISSUE](state: State, issue: Issue) {
    state.issues.push(issue);
  },

  // Edit issue
  [MutationTypes.EDIT_ISSUE](state: State, payload: Issue) {
    state.issues = state.issues.map((issue) => {
      if (issue.id === payload.id) {
        return payload;
      }
      return issue;
    });
  },

  // Delete issue
  [MutationTypes.DELETE_ISSUE](state: State, id: string) {
    state.issues = state.issues.filter((issue) => issue.id !== id);
  },
};
