"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AnimationProps, motion } from "framer-motion";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"input"> & {
  fieldError?: string[];
  labelText?: string;
};

const EditUserField = ({
  fieldError,
  labelText,
  className,
  ...props
}: Props) => {
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
    <motion.div
      className="flex flex-col space-y-1.5 w-full md:w-[40%]"
      layout="position"
    >
      <Label htmlFor={props.name}>{labelText ?? "label"}</Label>
      <Input
        className={cn([className, `${props.disabled && "input-disabled"}`])}
        {...props}
      />

      {fieldError && (
        <motion.span
          className="text-red-500 text-[12px]"
          animate={animationConfig}
        >
          {fieldError.join(", ")}
        </motion.span>
      )}
    </motion.div>
  );
};

export default EditUserField;
