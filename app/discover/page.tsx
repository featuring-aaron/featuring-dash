"use client";

import { useDiscover } from "../../hooks/useDicover";
import { useState } from "react";
import { SortingState } from "@tanstack/react-table";
import { DiscoverHeader } from "./components/DiscoverHeader";
import { InfluencerTable } from "./components/InfluencerTable";
import { TablePagination } from "./components/TablePagination";

export default function Discover() {
  const { data, isLoading, error } = useDiscover();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  if (error instanceof Error)
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Error: {error.message}
      </div>
    );

  const influencers = data?.data || [];
  const totalInfluencers = data?.total || 0;
  const currentPage = data?.page || 1;
  const pageSize = data?.pageSize || 20;
  const totalPages = Math.ceil(totalInfluencers / pageSize);

  return (
    <div className="w-full">
      <DiscoverHeader
        selectedPlatform={selectedPlatform}
        onPlatformChange={setSelectedPlatform}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        totalInfluencers={totalInfluencers}
      />

      <InfluencerTable
        data={influencers}
        sorting={sorting}
        onSortingChange={setSorting}
      />

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalInfluencers}
        onPreviousPage={() => {
          /* 이전 페이지 로직 */
        }}
        onNextPage={() => {
          /* 다음 페이지 로직 */
        }}
        canPreviousPage={currentPage > 1}
        canNextPage={currentPage < totalPages}
      />
    </div>
  );
}
