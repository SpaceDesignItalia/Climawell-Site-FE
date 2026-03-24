"use client"; // Aggiungi questa riga per rendere il componente un Client Component

import React, { useState } from "react"
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid"

interface PaginationProps {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
  itemsPerPage: number
  totalItems: number
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  itemsPerPage,
  totalItems,
}) => {
  const [inputPage, setInputPage] = useState<number>(currentPage)
  const pageNumbers = []
  const maxVisiblePages = 5

  // Generare numeri di pagina
  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push("...")
      pageNumbers.push(totalPages)
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1)
      pageNumbers.push("...")
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)
      pageNumbers.push("...")
      pageNumbers.push(currentPage)
      pageNumbers.push("...")
      pageNumbers.push(totalPages)
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setInputPage(page) // Update the input field with the new page
    }
  }

  const handleJump = () => {
    handlePageChange(inputPage)
  }

  return (
    <div>
      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
          {/* Previous Button */}
          <div className="-mt-px flex w-0 flex-1">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50"
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Precedente
            </button>
          </div>

          {/* Page Numbers */}
          <div className="hidden md:-mt-px md:flex">
            {pageNumbers.map((page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(Number(page))}
                  className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                    page === currentPage
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Next Button */}
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50"
            >
              Successiva
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </div>
        </nav>
      )}

  
    </div>
  )
}
