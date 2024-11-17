import React from "react";
import {
  getAccessToken,
  getSession,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next/types";
import { TQuestion } from "@/models/question";

type ProtectedPageProps = {
  user: any;
  questions: TQuestion[];
};
async function Questions({ user, questions }: ProtectedPageProps) {
  return (
    <div>
      <h1>Protected Questions (SSR)</h1>
      <p>Welcome, {user?.name}!</p>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.questionText}</li>
        ))}
      </ul>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export default Questions;

// Use getServerSideProps to fetch data on the server-side
export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    try {
      // Get the session to access the authenticated user
      const session = await getSession(ctx.req, ctx.res);

      // Get the access token from the server-side context
      const { accessToken } = await getAccessToken(ctx.req, ctx.res);

      // Fetch the protected data from the .NET WebAPI
      const apiResponse = await fetch("https://localhost:7285/api/question", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!apiResponse.ok) {
        throw new Error("Failed to fetch questions");
      }

      const questions = await apiResponse.json();

      // Pass the user info and questions as props to the component
      return {
        props: {
          user: session?.user || null,
          questions,
        },
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        props: {
          user: null,
          questions: [],
        },
      };
    }
  },
});
