export enum JIRA_ISSUE_TYPE {
  STORY = 'Story',
  TASK = 'Task',
  BUG = 'Bug',
  IMPROVEMENT = 'Improvement',
  EPIC = 'Epic'
}

export enum JIRA_STATUS {
  TO_DO = 'TO DO',
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN PROGRESS',
  IN_REVIEW = 'IN REVIEW',
  IMPEDED = 'IMPEDED',
  M8_VALIDATED = 'M8 VALIDATED',
  CLOSED = 'CLOSED',
  ESCALATED = 'ESCALATED'
}

export enum JIRA_PRIORITY {
  NORMAL = 'Normal',
  SHOW_STOPPER = 'Show-Stopper',
  CRITICAL = 'Critical',
  MAJOR = 'Major',
  MINOR = 'Minor',
  TRIVIAL = 'Trivial'
}
