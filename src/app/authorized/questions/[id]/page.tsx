import React from "react";
import EditForm from "./_components/EditForm";
import UserRoleSelect from "./_components/UserRoleSelect";
import BackButton from "./_components/BackButton";
import { QuizAPIRoutes } from "@/RoutePaths";
import { getUserById } from "@/lib/usersApi";

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
const fetchUserById = async (id: string) => {
  try {
    const response = await fetch(`${QuizAPIRoutes.UserList}/${id}`, {
      method: "GET",
      cache: "no-cache", // Ensure fresh data is fetched
    });

    if (!response.ok) {
      console.error("Failed to fetch user by ID:", response.statusText);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

const EditUser = async ({ params }: EditUserProps) => {
  const { id } = await params;
  const userInfo = await getUserById(id);
  console.log("USER INFO:", userInfo);
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
