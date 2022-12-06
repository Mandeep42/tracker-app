//issueStatuses

export type User = {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  email: string | null;
  password: string | null;
  created: Date | null;
};

// Declared issue statuses
export enum IssueStatus {
  new = "new",
  open = "open",
  closed = "closed",
  resolved = "resolved",
}

export type Issue = {
  id: string | null;
  user_id: string | null;
  title: string | null;
  type: string | null;
  created: Date | null;
  status: IssueStatus | null;
  description: string | null;
  keywords: Array<string>;
};
export enum IssueType {
  issue = "Issue",
  bug = "Bug",
}
export type Pagination = {
  page: number;
  pages: number;
  pageSize: number;
};
