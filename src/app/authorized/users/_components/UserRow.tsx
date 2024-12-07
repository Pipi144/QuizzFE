import QuizAppRoutes from "@/RoutePaths";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TBasicUser } from "@/models/user";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { FaUserPen } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";

type Props = {
  user: TBasicUser;
};

const UserRow = ({ user }: Props) => {
  return (
    <tr className="user-list-item">
      <td colSpan={3}>{user.email}</td>
      <td colSpan={2}>{dayjs(user.updatedAt).format("DD-MM-YYYY - h:mm a")}</td>
      <td colSpan={1}>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="mx-2">
              <Link href={`${QuizAppRoutes.Users}/${user.userId}`}>
                <FaUserPen className="text-white" size={20} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Link
          className="mx-2"
          href={`${QuizAppRoutes.Users}/${user.userId}/delete`}
        >
          <RiDeleteBin6Fill className="!text-red" size={20} color="red" />
        </Link>
      </td>
    </tr>
  );
};

export default UserRow;
