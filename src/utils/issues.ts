import { httpAxios, methods } from "@/http";
import { Issue } from "@/types";

// Fetch all user issues
export const userIssues = (userId: string) => {
  return httpAxios(
    methods.GET,
    `issues?user_id=${userId}&_sort=created&_order=desc`
  ).then((response) => {
    return response && response.data;
  });
};
export const createIssue = (issue: Issue) => {
  return httpAxios(methods.POST, "issues", {
    ...issue,
  }).then((response) => {
    return response;
  });
};
export const editIssue = (issue: Issue) => {
  return httpAxios(methods.PUT, `issues/${issue.id}`, {
    ...issue,
  }).then((response) => {
    return response;
  });
};
export const deleteIssue = (issue: Issue) => {
  return httpAxios(methods.DELETE, `issues/${issue.id}`).then((response) => {
    return response;
  });
};
