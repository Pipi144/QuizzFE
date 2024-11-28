import QuizAppRoutes from "@/RoutePaths";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import RegisterForm from "./_components/RegisterForm";

type Props = {};

const Register = (props: Props) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription className="md:text-[14px]">
          Already have an account?{" "}
          <Link
            href={QuizAppRoutes.Login}
            className="text-sky-600 hover:text-sky-300 transition-all duration-200 ease-linear "
          >
            Login
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </>
  );
};

export default Register;
