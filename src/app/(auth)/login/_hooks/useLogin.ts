import { useForm } from "react-hook-form";
import { TLogin } from "../_models/AuthModels";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AnimationProps } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const respJs = await response.json();
      if (respJs.access_token) {
        // Store the tokens securely (e.g., in cookies or localStorage)
        // sessionStorage.setItem("access_token", respJs.access_token);
        toast({ title: "Login success" });
      } else {
        toast({
          title: "Login failed",
          description: "No token",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
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
