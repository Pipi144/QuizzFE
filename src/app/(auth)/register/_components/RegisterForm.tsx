"use client";
import { TRegisterState } from "@/models/AuthModels";
import React, { useActionState } from "react";
import { handleRegister } from "../action";
import { AnimationProps, motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {};

const RegisterForm = (props: Props) => {
  const [state, dispatch, isPending] = useActionState<
    TRegisterState | undefined,
    FormData
  >(async (prev, formData) => {
    let result = await handleRegister(formData);
    return result;
  }, {});

  const animationConfig: AnimationProps["animate"] = {
    y: [-5, 0],
    opacity: [0, 1],
    transition: {
      damping: 16,
      mass: 0.6,
      stiffness: 140,
    },
  };
  return (
    <motion.form
      action={dispatch}
      layout="size"
      transition={{ damping: 16, mass: 0.4, bounceDamping: 14 }}
    >
      <div className="grid w-full items-center gap-4">
        <motion.div className="flex flex-col space-y-1.5" layout="position">
          <Label htmlFor="email">Email </Label>
          <Input
            id="email"
            placeholder="Enter your email..."
            name="email"
            defaultValue={state?.email}
          />

          {state?.emailErrors && (
            <motion.span
              className="text-red-500 text-[12px]"
              animate={animationConfig}
            >
              {state.emailErrors.join(", ")}
            </motion.span>
          )}
        </motion.div>
        <motion.div className="flex flex-col space-y-1.5" layout="position">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Enter your password..."
            type="password"
            name="password"
            defaultValue={state?.password}
          />
          {state?.passwordErrors && (
            <motion.span
              className="text-red-500 text-[12px]"
              animate={animationConfig}
            >
              {state.passwordErrors.join(",")}
            </motion.span>
          )}
        </motion.div>
        <motion.div className="flex flex-col space-y-1.5" layout="position">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name..."
            name="firstName"
            defaultValue={state?.firstName}
          />
        </motion.div>
        <motion.div className="flex flex-col space-y-1.5" layout="position">
          <Label htmlFor="givenName">Given name</Label>
          <Input
            id="givenName"
            placeholder="Enter your middle name..."
            name="givenName"
            defaultValue={state?.givenName}
          />
        </motion.div>
        <motion.div className="flex flex-col space-y-1.5" layout="position">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            placeholder="Enter your family name..."
            name="lastName"
            defaultValue={state?.lastName}
          />
        </motion.div>
        <motion.div className="flex flex-col space-y-1.5" layout="position">
          <Label htmlFor="nickName">Nick name</Label>
          <Input
            id="nickName"
            placeholder="Enter your nickname..."
            name="nickName"
            defaultValue={state?.nickName}
          />
        </motion.div>
        {state?.serverErrors && (
          <motion.span
            className="text-red-500 text-[12px]"
            animate={animationConfig}
          >
            {state.serverErrors.join(",")}
          </motion.span>
        )}
      </div>

      <Button
        variant="outline"
        className="w-full bg-black text-white border-none mt-[30px]"
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <>
            Submitting...
            <Spinner size="medium" className="text-white " />
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </motion.form>
  );
};

export default RegisterForm;
