import { baseAddress } from "@/baseAddress";
import { TQuizAttempt } from "@/models/quiz";
import QuizAppRoutes from "@/RoutePaths";
import { getValidCookieToken } from "@/utils/serverHelperFnc";
import Link from "next/link";
import React from "react";
import { FaAngleLeft } from "react-icons/fa6";

type Props = {
  params: Promise<{
    attempId: string;
  }>;
};

const getQuizResult = async (
  attempId: string
): Promise<TQuizAttempt | undefined> => {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken) return;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(
      `${baseAddress}/api/quiz-attempts/${attempId}`,
      {
        method: "GET",
        headers: header,
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch quiz attempt by ID:", response.statusText);
      return;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching quiz attempt by ID:", error);
    return;
  }
};
const QuizResult = async ({ params }: Props) => {
  const { attempId } = await params;
  const quizResult = await getQuizResult(attempId);
  if (!quizResult) throw new Error("Quiz result not found");
  return (
    <div className="max-w-2xl flex h-full pt-[80px] flex-col !font-concert text-white mx-auto w-full p-5 items-center">
      <Link
        href={QuizAppRoutes.Quiz}
        className="flex flex-row items-center self-start"
      >
        <FaAngleLeft color="white" size={16} />
        Quizzes
      </Link>
      <h1 className="text-3xl">Quiz result</h1>
      <div className="double-field-wrapper">
        <h3 className="label-text">Quiz name</h3>

        <h3 className="detail-text">{quizResult.quizName}</h3>
      </div>
      <div className="double-field-wrapper">
        <h3 className="label-text">Number of questions</h3>

        <h3 className="detail-text">{quizResult.totalQuestions}</h3>
      </div>
      <div className="double-field-wrapper">
        <h3 className="label-text">Correct answers</h3>

        <h3 className="detail-text">{quizResult.correctAnswers}</h3>
      </div>
      <div className="double-field-wrapper">
        <h3 className="label-text">Final score</h3>

        <h3 className="detail-text">{quizResult.score}</h3>
      </div>
    </div>
  );
};

export default QuizResult;
