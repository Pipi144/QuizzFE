import React from "react";
import UserRow from "./_components/UserRow";
import UserTableFooter from "./_components/UserTableFooter";
import { Metadata } from "next";
import { getUserList } from "@/app/authorized/users/usersApi";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Users",
  description: "All users information",
};

const UserList = async ({ searchParams }: Props) => {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "0", 10);

  const safePage = isNaN(currentPage) ? 0 : currentPage;
  const userListResp = await getUserList({ page: safePage });

  return (
    <div className="w-full h-full flex flex-col  max-w-[980px] p-[20px] pt-[80px] mx-auto">
      <h1 className="page-title-text">Users</h1>
      {!userListResp || userListResp.users.length === 0 ? (
        <h3 className="text-2xl font-concert text-white text-center">
          No User
        </h3>
      ) : (
        <table className="list-table">
          <thead>
            <tr className="list-table-header">
              <th>Email</th>
              <th colSpan={1} />
              <th colSpan={1}>Last updated</th>
              <th colSpan={1} />
            </tr>
          </thead>
          <tbody>
            {userListResp?.users.map((user) => (
              <UserRow user={user} key={user.userId} />
            ))}
          </tbody>
          <UserTableFooter
            currentPage={safePage}
            totalItems={userListResp.total}
            itemPerPage={userListResp.pageSize}
          />
        </table>
      )}
    </div>
  );
};

export default UserList;
