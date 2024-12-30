"use client";
import { TUserDetail } from "@/models/user";
import React, { PropsWithChildren, useActionState } from "react";
import { TUpdateUserState } from "../page";
import { updateUser } from "../../actions";
import EditUserField from "./EditUserField";
import AnimatedDiv from "@/components/AnimatedComponents/AnimatedDiv";
import { Button } from "@/components/ui/button";
import BackButton from "./BackButton";

type Props = PropsWithChildren & {
  userInfo: TUserDetail;
};

const EditForm = ({ userInfo, children }: Props) => {
  const [state, action, isPending] = useActionState<TUpdateUserState, FormData>(
    async (data, payload) => {
      return (await updateUser(payload)) ?? data;
    },
    {}
  );
  return (
    <form
      className="w-full max-w-[600px] flex-1  overflow-auto custom-scrollbar"
      action={action}
    >
      <div className="double-field-wrapper">
        <input type="hidden" value={userInfo.userId} name="userId" />
        <input
          type="hidden"
          value={userInfo.userRoles[0]?.roleId}
          name="currentRoleId"
        />
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
          defaultValue={state.name ?? userInfo.name}
          fieldError={state.errorName}
        />

        <EditUserField
          labelText="Nickname"
          id="nickName"
          placeholder="Enter your nickname..."
          name="nickName"
          defaultValue={state.nickName ?? userInfo.nickName}
        />
      </div>

      <div className="double-field-wrapper">{children}</div>
      {state?.errorServer && (
        <AnimatedDiv
          className="error-text"
          animate={{ x: [-5, 0], opacity: [0, 1] }}
        >
          {state.errorServer.join(", ")}
        </AnimatedDiv>
      )}
      <div className="flex flex-row mt-4 items-center justify-end">
        <Button className="submit-btn" type="submit">
          {isPending ? "Submitting..." : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
