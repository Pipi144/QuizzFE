import AnimatedDiv from "@/components/AnimatedComponents/AnimatedDiv";
import AnimatedSpan from "@/components/AnimatedComponents/AnimatedSpan";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AnimationProps } from "framer-motion";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"input"> & {
  fieldError?: string[];
  labelText?: string;
};

const AddQuizTextField = ({
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
    <AnimatedDiv
      className={`flex flex-col space-y-1.5 w-full mb-5`}
      layout="position"
    >
      <Label htmlFor={props.name}>{labelText ?? "label"}</Label>
      <Input
        className={cn([className, `${props.disabled && "input-disabled"}`])}
        {...props}
      />

      {fieldError && (
        <AnimatedSpan className="error-text" animate={animationConfig}>
          {fieldError.join(", ")}
        </AnimatedSpan>
      )}
    </AnimatedDiv>
  );
};

export default AddQuizTextField;
