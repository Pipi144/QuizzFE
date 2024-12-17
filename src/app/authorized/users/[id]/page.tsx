import React from "react";
import { notFound } from "next/navigation";
import EditForm from "./_components/EditForm";
import { getUserById } from "@/lib/usersApi";
import UserRoleSelect from "./_components/UserRoleSelect";
import BackButton from "./_components/BackButton";

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
export const generateMetadata = ({}: EditUserProps) => {};

const EditUser = async ({ params }: EditUserProps) => {
  const { id } = await params;
  const userInfo = await getUserById(id);

  if (!userInfo) notFound();
  return (
    <div className="max-w-5xl flex h-full pt-[80px] flex-col font-concert text-white mx-auto w-full p-5 items-center">
      <BackButton />
      <h1 className="text-3xl">Edit User</h1>
      <EditForm userInfo={userInfo}>
        {/* @ts-expect-error Server Component */}

        <UserRoleSelect user={userInfo} />
      </EditForm>
    </div>
  );
};

export default EditUser;
