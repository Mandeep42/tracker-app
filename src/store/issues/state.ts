import { Issue } from "./types";

export interface State {
  issues: Array<Issue>;
}

export const state = {
  issues: [],
} as State;

// export type State = typeof state;
