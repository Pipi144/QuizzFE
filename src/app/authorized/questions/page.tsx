import { Metadata } from "next";
import React from "react";
import AddQuestions from "./_components/AddQuestions";
import SearchQuestion from "./_components/SearchQuestion";
import QuestionRow from "./_components/QuestionRow";
import QuestionTableFooter from "./_components/QuestionTableFooter";
import { getAllQuestions } from "./questionApi";

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>;
};
export const metadata: Metadata = {
  title: "Questions",
  description: "All questions information",
};

const Questions = async ({ searchParams }: Props) => {
  const { search, page } = await searchParams;
  const currentPage = parseInt(page || "0", 10);

  const safePage = isNaN(currentPage) ? 0 : currentPage;
  const questionListResp = await getAllQuestions({ search, page: safePage });
  return (
    <div className="w-full h-full flex flex-col  max-w-[980px] p-[20px] pt-[80px] mx-auto text-white font-concert">
      <h1 className="page-title-text">Questions</h1>

      <div className="flex items-center  w-full">
        <SearchQuestion />
        <AddQuestions />
      </div>

      {!questionListResp || questionListResp.items.length === 0 ? (
        <h3 className="text-2xl font-concert text-white text-center mt-3">
          No Questions
        </h3>
      ) : (
        <table className="list-table mt-3">
          <thead>
            <tr className="list-table-header">
              <th className="text-zinc-50">Question</th>
              <th colSpan={1} />
              <th colSpan={1} />
              <th colSpan={1} />
            </tr>
          </thead>
          <tbody>
            {questionListResp?.items.map((q) => (
              <QuestionRow question={q} key={q.id} />
            ))}
          </tbody>
          <QuestionTableFooter
            currentPage={safePage}
            totalItems={questionListResp.totalCount}
            itemPerPage={questionListResp.pageSize}
          />
        </table>
      )}
    </div>
  );
};

export default Questions;
