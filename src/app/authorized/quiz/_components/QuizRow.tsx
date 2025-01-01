import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TBasicQuiz } from "@/models/quiz";
import QuizAppRoutes from "@/RoutePaths";
import dayjs from "dayjs";
import Link from "next/link";
import React, { memo } from "react";
import { FaUserPen } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";

type Props = {
  quiz: TBasicQuiz;
};

const QuizRow = ({ quiz }: Props) => {
  return (
    <tr className="tb-row-item">
      <td colSpan={2}>{quiz.quizName} </td>
      <td colSpan={1}>{dayjs(quiz.createdAt).format("DD-MM-YYYY - h:mm a")}</td>
      <td colSpan={1} className="text-center">
        {quiz.numberOfQuestions}
      </td>
      <td colSpan={1} className="cell-item-end">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="mx-2">
              <Link href={`${QuizAppRoutes.Quiz}/${quiz.quizId}`}>
                <FaUserPen className="text-white" size={20} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Quiz</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Link
          className="mx-2"
          href={`${QuizAppRoutes.QuestionList}/${quiz.quizId}/delete`}
        >
          <RiDeleteBin6Fill className="!text-red" size={20} color="red" />
        </Link>
      </td>
    </tr>
  );
};

export default memo(QuizRow);
