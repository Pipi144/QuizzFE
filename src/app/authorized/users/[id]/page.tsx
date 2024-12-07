import React from "react";
import EditUserField from "./_components/EditUserField";
import { getUserById } from "../actions";
import { notFound } from "next/navigation";
import UserRoleSelect from "./_components/UserRoleSelect";

type EditUserProps = {
  params: {
    id: string;
  };
};
const EditUser = async ({ params }: EditUserProps) => {
  const { id } = await params;
  const userInfo = await getUserById(id);
  console.log("USER INFO:", userInfo);
  if (!userInfo) notFound();
  return (
    <div className="max-w-5xl flex h-full pt-[80px] flex-col font-concert text-white mx-auto w-full p-5 items-center">
      <h1 className="text-3xl">Edit User</h1>

      <form className="w-full max-w-[600px] flex-1  overflow-auto custom-scrollbar">
        <div className="double-field-wrapper">
          <EditUserField
            labelText="Email"
            id="email"
            placeholder="Enter your email..."
            name="email"
            disabled={true}
            defaultValue={userInfo.email}
          />
        </div>
        <div className="double-field-wrapper">
          <EditUserField
            labelText="Name"
            id="name"
            placeholder="Enter your full name..."
            name="name"
            defaultValue={userInfo.name}
          />

          <EditUserField
            labelText="Nickname"
            id="nickName"
            placeholder="Enter your nickname..."
            name="nickName"
            defaultValue={userInfo.nickName}
          />
        </div>

        <div className="double-field-wrapper">
          {/* @ts-expect-error Async Server Component */}

          <UserRoleSelect user={userInfo} />
        </div>
      </form>
    </div>
  );
};

export default EditUser;
