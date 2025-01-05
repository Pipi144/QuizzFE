import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TBasicQuestion } from "@/models/question";
import QuizAppRoutes from "@/RoutePaths";
import Link from "next/link";
import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

type Props = {
  question: TBasicQuestion;
};

const QuestionRow = ({ question }: Props) => {
  return (
    <tr className="tb-row-item">
      <td colSpan={2}>{question.questionText} </td>
      <td colSpan={1} />
      <td colSpan={1} className="cell-item-end">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="mx-2">
              <Link href={`${QuizAppRoutes.QuestionList}/${question.id}`}>
                <MdModeEditOutline className="text-white" size={20} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Question</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Link
          className="mx-2"
          href={`${QuizAppRoutes.QuestionList}/${question.id}/delete`}
        >
          <RiDeleteBin6Fill className="!text-red" size={20} color="red" />
        </Link>
      </td>
    </tr>
  );
};

export default QuestionRow;
