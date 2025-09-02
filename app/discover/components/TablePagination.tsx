"use client";

import { Button } from "../../../components/ui/button";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
}

export function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  onPreviousPage,
  onNextPage,
  canPreviousPage,
  canNextPage,
}: TablePaginationProps) {
  return (
    <div className="bg-white px-6 py-3 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <span>
            페이지 {currentPage} / {totalPages}
          </span>
          <span>총 {totalItems.toLocaleString()}개 항목</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviousPage}
            disabled={!canPreviousPage}
          >
            이전
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={!canNextPage}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
