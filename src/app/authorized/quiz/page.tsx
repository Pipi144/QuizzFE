import { Metadata } from "next";
import React from "react";
import { getAllQuizzes } from "./quizApi";
import SearchQuiz from "./_components/SearchQuiz";
import QuizTableFooter from "./_components/QuizTableFooter";
import QuizRow from "./_components/QuizRow";
import Link from "next/link";
import QuizAppRoutes from "@/RoutePaths";

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>;
};
export const metadata: Metadata = {
  title: "Questions",
  description: "All questions information",
};

const Quizzes = async ({ searchParams }: Props) => {
  const { search, page } = await searchParams;
  const currentPage = parseInt(page || "0", 10);

  const safePage = isNaN(currentPage) ? 0 : currentPage;
  const quizListResp = await getAllQuizzes({ search, page: safePage });

  return (
    <div className="w-full h-full flex flex-col  max-w-[980px] p-[20px] pt-[80px] mx-auto text-white font-concert">
      <h1 className="page-title-text">Quizzes</h1>

      <div className="flex items-center  w-full">
        <SearchQuiz />
        <Link
          className="bg-white text-black ml-auto hover:opacity-80 font-concert text-base px-4 py-1 rounded-sm"
          href={QuizAppRoutes.AddQuiz}
        >
          Add quiz
        </Link>
      </div>

      {!quizListResp || quizListResp.items.length === 0 ? (
        <h3 className="text-2xl font-concert text-white text-center mt-3">
          No Quiz
        </h3>
      ) : (
        <table className="list-table mt-3">
          <thead>
            <tr className="list-table-header">
              <th className="text-zinc-50" colSpan={1}>
                Quiz name
              </th>
              <th colSpan={1} />
              <th colSpan={1} className="text-zinc-50">
                Created at
              </th>
              <th colSpan={1} className="text-zinc-50 !text-center">
                No of questions
              </th>
              <th colSpan={1} />
            </tr>
          </thead>
          <tbody>
            {quizListResp?.items.map((q) => (
              <QuizRow quiz={q} key={q.quizId} />
            ))}
          </tbody>
          <QuizTableFooter
            currentPage={safePage}
            totalItems={quizListResp.totalCount}
            itemPerPage={quizListResp.pageSize}
          />
        </table>
      )}
    </div>
  );
};

export default Quizzes;
