import { StatusMessageEnum } from './StatusMessageEnum';

export type PRRequest = {
  token: string;
  jira: string;
  query: string;
};

export type PRResponse = {
  message: StatusMessageEnum;
  prlink: string;
};

export type PRData = {
  title: string;
  fromRef: {
    id: string;
    repository: Repository;
  };
  toRef: {
    id: string;
    repository: Repository;
  };
  reviewers: Reviewer[];
};

export type Repository = {
  slug: string;
  name: any;
  project: {
    key: string;
  };
};

export type Reviewer = {
  user: {
    name: string;
  };
};
