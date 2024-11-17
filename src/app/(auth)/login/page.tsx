"use client";
import { QuizAppRoutes } from "@/RoutePaths";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import useLogin from "./_hooks/useLogin";
import { motion } from "framer-motion";

type Props = {};

const Login = (props: Props) => {
  const { register, errors, animationConfig, onSubmit } = useLogin();
  return (
    <>
      <CardHeader className="items-center justify-center">
        <CardTitle className="md:text-[30px]">Login</CardTitle>
        <CardDescription className="md:text-[14px]">
          Don't have an account?{" "}
          <Link
            href={QuizAppRoutes.Register}
            className="text-sky-600 hover:text-sky-300 transition-all duration-200 ease-linear "
          >
            Register
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.form layout="size" onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4">
            <motion.div className="flex flex-col space-y-1.5" layout="position">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email..."
                {...register("email")}
              />

              {errors.email?.message && (
                <motion.span
                  className="text-red-500 text-[12px]"
                  animate={animationConfig}
                >
                  {errors.email.message}
                </motion.span>
              )}
            </motion.div>
            <motion.div className="flex flex-col space-y-1.5" layout="position">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password..."
                type="password"
                {...register("password")}
              />
              {errors.password?.message && (
                <motion.span
                  className="text-red-500 text-[12px]"
                  animate={animationConfig}
                >
                  {errors.password.message}
                </motion.span>
              )}
            </motion.div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-black text-white border-none mt-[30px]"
            type="submit"
          >
            Login
          </Button>
        </motion.form>
      </CardContent>
    </>
  );
};

export default Login;
