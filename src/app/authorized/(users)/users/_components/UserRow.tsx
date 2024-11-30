import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TBasicUser } from "@/models/user";
import dayjs from "dayjs";
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
      <td colSpan={2}>
        {dayjs(user.updatedAt).format("DD-MM-YYYY at HH:mm:ss")}
      </td>
      <td colSpan={1}>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="mx-1">
              <FaUserPen className="text-white" size={20} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <button className="mx-1">
          <RiDeleteBin6Fill className="text-white" size={20} />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
