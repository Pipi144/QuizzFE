import { TBasicUser } from "./user";

export type TGetUserListResponse = {
  start: number;
  limit: number;
  users: TBasicUser[];
  total: number;
};
