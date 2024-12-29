import { TBasicUser } from "./user";

export type TGetUserListResponse = {
  start: number;
  pageSize: number;
  users: TBasicUser[];
  total: number;
};
