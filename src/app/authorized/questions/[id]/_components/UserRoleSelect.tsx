import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TUserDetail } from "@/models/user";
import { getUserRoles } from "@/lib/usersApi";

type Props = {
  user: TUserDetail;
};

async function UserRoleSelect({ user }: Props) {
  const allRoles = await getUserRoles();
  return (
    <div className="flex flex-col space-y-1.5 w-full md:w-[40%]">
      <Label htmlFor={"userRole"}>Role</Label>
      <Select defaultValue={user.userRoles[0]?.roleId} name="newRoleId">
        <SelectTrigger className="w-[180px] p-2">
          <SelectValue placeholder="Select role..." />
        </SelectTrigger>
        <SelectContent className="bg-cardBgColor border-none ">
          {allRoles?.map((role) => (
            <SelectItem
              value={role.roleId}
              key={role.roleId}
              className="text-white font-concert p-3 text-[14px] font-[400]"
            >
              {role.roleName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default UserRoleSelect;
