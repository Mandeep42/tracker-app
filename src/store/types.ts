import { State as UsersState } from "./users/state";
import { State as IssuesState } from "./issues/state";

export interface RootState {
  users: UsersState;
  issues: IssuesState;
}
