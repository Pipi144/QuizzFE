"use client";
import Pagination from "@/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  totalItems: number;
  itemPerPage: number;
  currentPage: number;
};

const QuizTableFooter = ({ currentPage, totalItems, itemPerPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPageNum = Math.ceil(totalItems / itemPerPage);
  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };
  return (
    <tfoot>
      <tr>
        <td colSpan={5}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPageNum}
            onPageChange={onPageChange}
          />
        </td>
      </tr>
    </tfoot>
  );
};

export default QuizTableFooter;
