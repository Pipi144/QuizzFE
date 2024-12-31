import { getUserById } from "@/app/authorized/users/usersApi";
import { notFound } from "next/navigation";
import React from "react";
import BackButton from "../_components/BackButton";
import ConfirmDelete from "../_components/ConfirmDelete";

type Props = {
  params: Promise<{ id: string }>;
};

const DeleteUser = async ({ params }: Props) => {
  const { id } = await params;
  const userInfo = await getUserById(id);

  if (!userInfo) notFound();
  return (
    <div className="max-w-lg flex h-full pt-[80px] flex-col font-concert text-white mx-auto w-full p-5 items-center">
      <BackButton />
      <h1 className="text-3xl my-5">Delete User</h1>

      <div className="double-field-wrapper">
        <h3 className="label-text">Email</h3>

        <h3 className="detail-text">{userInfo.email}</h3>
      </div>
      <div className="double-field-wrapper">
        <h3 className="label-text">Name</h3>

        <h3 className="detail-text">{userInfo.name}</h3>
      </div>
      <div className="double-field-wrapper">
        <h3 className="label-text">Nickname</h3>

        <h3 className="detail-text">{userInfo.nickName}</h3>
      </div>

      <ConfirmDelete userId={id} />
    </div>
  );
};

export default DeleteUser;
