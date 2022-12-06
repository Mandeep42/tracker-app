import { ActionTree, Commit } from "vuex";
import { State } from "./state";
import { RootState } from "@/store/types";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { Issue } from "./types";

export const actions: ActionTree<State, RootState> = {
  // Set issues
  [ActionTypes.SET_ISSUES](
    { commit }: { commit: Commit },
    issues: Array<Issue>
  ) {
    commit(MutationTypes.SET_ISSUES, issues);
  },

  // Ad new issue
  [ActionTypes.ADD_ISSUE]({ commit }: { commit: Commit }, issue: Issue) {
    commit(MutationTypes.ADD_ISSUE, issue);
  },

  // Edit issue
  [ActionTypes.EDIT_ISSUE]({ commit }: { commit: Commit }, issue: Issue) {
    commit(MutationTypes.EDIT_ISSUE, issue);
  },

  // Delete issue
  [ActionTypes.DELETE_ISSUE]({ commit }: { commit: Commit }, id: string) {
    commit(MutationTypes.DELETE_ISSUE, id);
  },
};
