import React from "react";
import UserRow from "./_components/UserRow";
import UserTableFooter from "./_components/UserTableFooter";
import { Metadata } from "next";
import { getUserList } from "@/lib/usersApi";

type Props = {};

export const metadata: Metadata = {
  title: "Users",
  description: "All users information",
};
const UserList = async (props: Props) => {
  const userListResp = await getUserList({});

  return (
    <div className="w-full h-full flex flex-col  max-w-[980px] p-[20px] pt-[80px] mx-auto">
      <h1 className="text-white text-3xl font-Gorditas mb-3">Users</h1>
      {!userListResp || userListResp.users.length === 0 ? (
        <h3 className="text-2xl font-concert text-white text-center">
          No User
        </h3>
      ) : (
        <table className="user-list-table">
          <thead>
            <tr className="user-list-header">
              <th colSpan={5}>Email</th>
              <th colSpan={2}>Last updated</th>
              <th colSpan={1}></th>
            </tr>
          </thead>
          <tbody>
            {userListResp?.users.map((user) => (
              <UserRow user={user} key={user.userId} />
            ))}
          </tbody>
          <UserTableFooter
            totalItems={userListResp.total}
            itemPerPage={userListResp.limit}
          />
        </table>
      )}
    </div>
  );
};

export default UserList;
