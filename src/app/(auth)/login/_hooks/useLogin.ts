import { useForm } from "react-hook-form";
import { TLogin } from "../_models/AuthModels";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AnimationProps } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email required")
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, "Password required"),
});
const useLogin = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    toast({
      title: "Login Successfully",
      description: "You have logged in",
    });
  });
  const animationConfig: AnimationProps["animate"] = {
    y: [-5, 0],
    opacity: [0, 1],
    transition: {
      damping: 16,
      mass: 0.6,
      stiffness: 140,
    },
  };
  return { register, errors, animationConfig, onSubmit };
};

export default useLogin;
