import { User } from "./types";

export interface State {
  users: Array<User>;
  authDetails?: User | null;
}
export const state = {
  users: [],
  authDetails: null,
} as State;
