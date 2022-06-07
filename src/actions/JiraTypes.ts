import { JIRA_ISSUE_TYPE, JIRA_STATUS, JIRA_PRIORITY } from './JiraEnums';
import { StatusMessageEnum } from './StatusMessageEnum';

export type JiraData = {
  key: string;
  issuetype: JIRA_ISSUE_TYPE;
  description: string;
  status: JIRA_STATUS;
  assignee: string;
  summary: string;
  priority: JIRA_PRIORITY;
};

export type JiraDataRequest = {
  token: string;
  jira: string;
};

export type JiraDataResponse = {
  message: StatusMessageEnum;
  data: JiraData;
};
