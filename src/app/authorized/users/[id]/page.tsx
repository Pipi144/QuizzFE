import React from "react";
import EditForm from "./_components/EditForm";
import UserRoleSelect from "./_components/UserRoleSelect";
import BackButton from "./_components/BackButton";
import { QuizAPIRoutes } from "@/RoutePaths";
import { getUserById } from "@/app/authorized/users/usersApi";

export type TUpdateUserState = {
  nickName?: string;
  name?: string;
  errorName?: string[];
  errorServer?: string[];
};
type EditUserProps = {
  params: Promise<{
    id: string;
  }>;
};

const EditUser = async ({ params }: EditUserProps) => {
  const { id } = await params;
  const userInfo = await getUserById(id);
  if (!userInfo) throw new Error("User not found");
  return (
    <div className="max-w-5xl flex h-full pt-[80px] flex-col font-concert text-white mx-auto w-full p-5 items-center">
      <BackButton />
      <h1 className="text-3xl">Edit User</h1>
      <EditForm userInfo={userInfo}>
        <UserRoleSelect user={userInfo} />
      </EditForm>
    </div>
  );
};

export default EditUser;
