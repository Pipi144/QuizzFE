"use client";
import React from "react";

type Props = {
  currentPage: number; // Current active page (0-based index)
  totalPages: number; // Total number of pages (0-based index)
  onPageChange: (page: number) => void; // Callback to handle page change
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const maxPageButtons = 3;

  // Calculate visible pages
  const startPage = Math.max(0, currentPage - 1); // Show one page before the current page
  const endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1); // Limit to max buttons

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex justify-center items-center mt-4 space-x-2 text-white font-concert text-base">
      {/* First Page Button */}
      <button
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
        className="px-4 py-2 disabled:opacity-60"
      >
        {"<<"}
      </button>

      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-4 py-2 disabled:opacity-60"
      >
        Prev
      </button>

      {/* Page Number Buttons */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 ${
            page === currentPage && " text-black font-bold bg-white rounded-md"
          }`}
        >
          {page + 1 /* Display as 1-based for users */}
        </button>
      ))}

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 disabled:opacity-60"
      >
        Next
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 rounded-r disabled:opacity-60"
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
