import { TBasicQuestion } from "./question";
import { TBasicUser } from "./user";

export type TGetUserListResponse = {
  start: number;
  pageSize: number;
  users: TBasicUser[];
  total: number;
};

export type TPaginatedResponse<T> = {
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
};
