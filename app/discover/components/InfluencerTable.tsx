"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnPinningState,
} from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { Badge } from "../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { ChevronDown, ChevronUp, ExternalLink, Heart, Eye } from "lucide-react";
import { Influencer } from "../../../types/influencer";

interface InfluencerTableProps {
  data: Influencer[];
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
}

const columnHelper = createColumnHelper<Influencer>();

export function InfluencerTable({
  data,
  sorting,
  onSortingChange,
}: InfluencerTableProps) {
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["select", "account"],
    right: [],
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("pk", {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value: boolean) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        size: 50,
      }),
      columnHelper.accessor("username", {
        id: "account",
        header: "계정",
        cell: ({ row }) => {
          const influencer = row.original;
          return (
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={influencer.profile_img_link}
                  alt={influencer.username}
                />
                <AvatarFallback>
                  {influencer.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-sm truncate">
                    {influencer.username}
                  </span>
                  {influencer.is_verified && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      ✓
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500 truncate">
                  {influencer.full_name}
                </span>
              </div>
              <div className="flex gap-1 ml-2 shrink-0">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Eye className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Heart className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        },
        size: 300,
      }),
      columnHelper.accessor("pk", {
        id: "lastUpload",
        header: "최근 업로드 일",
        cell: () => (
          <div className="flex text-sm">
            <div>3일 전</div>
            <div className="text-gray-500">(25.08.30)</div>
          </div>
        ),
        size: 140,
      }),
      columnHelper.accessor("follower", {
        id: "follower",
        header: ({ column }) => <span>팔로워 수</span>,
        cell: ({ getValue }) => (
          <span className="font-medium">{getValue().toLocaleString()}</span>
        ),
        size: 140,
      }),
      columnHelper.accessor("real_follower", {
        id: "realFollower",
        header: "예상 유효 팔로워수",
        cell: ({ getValue }) => (
          <span className="font-medium">{getValue().toLocaleString()}</span>
        ),
        size: 180,
      }),
      columnHelper.accessor("real_engagement", {
        id: "engagement",
        header: "ER",
        cell: ({ getValue }) => (
          <span className="font-medium">{(getValue() * 100).toFixed(2)}%</span>
        ),
        size: 100,
      }),
      columnHelper.accessor("avg_reach", {
        id: "avgReach",
        header: "예상 평균 도달 수",
        cell: ({ getValue }) => (
          <span className="font-medium">{getValue().toLocaleString()}</span>
        ),
        size: 180,
      }),
      columnHelper.accessor("avg_feed_like", {
        id: "avgFeedLike",
        header: "평균 피드 좋아요 수",
        cell: ({ getValue }) => (
          <span className="font-medium">
            {Math.round(getValue()).toLocaleString()}
          </span>
        ),
        size: 180,
      }),
      columnHelper.accessor("pk", {
        id: "avgVideoViews",
        header: "평균 동영상 조회 수",
        cell: () => <span className="font-medium">-</span>,
        size: 180,
      }),
      columnHelper.accessor("main_audience_gender", {
        id: "main_audience_gender",
        header: "오디언스 성별",
        cell: () => <span className="font-medium">-</span>,
        size: 150,
      }),
      columnHelper.accessor("main_audience_age_range", {
        id: "main_audience_age_range",
        header: "오디언스 나이",
        cell: () => <span className="font-medium">-</span>,
        size: 150,
      }),
      columnHelper.accessor("is_verified", {
        id: "is_verified",
        header: "검증 여부",
        cell: () => <span className="font-medium">-</span>,
        size: 150,
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnPinning },
    onSortingChange,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // 왼쪽 고정 컬럼 총 너비(px) 계산 → 왼쪽 영역 폭
  const leftWidth = table
    .getLeftLeafColumns()
    .reduce((sum, c) => sum + c.getSize(), 0);

  return (
    <div className="grid" style={{ gridTemplateColumns: `${leftWidth}px 1fr` }}>
      <div className="border-r bg-white">
        <table className="w-[${leftWidth}px] table-fixed">
          <thead className="bg-gray-50 border-b    border-r-2  h-[38px]">
            {table.getLeftHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: header.column.getSize(),
                      minWidth: header.column.getSize(),
                      maxWidth: header.column.getSize(),
                    }}
                    className={` text-sm font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="h-[80px]   border-b  hover:bg-gray-50  "
              >
                {row.getLeftVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                      maxWidth: cell.column.getSize(),
                    }}
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 오른쪽 스크롤 테이블 (나머지 컬럼 전부) */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50 border-b   h-[38px]">
            {table.getCenterHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: header.column.getSize(),
                      minWidth: header.column.getSize(),
                      maxWidth: header.column.getSize(),
                    }}
                    className="border-r text-sm  font-medium text-gray-500 uppercase tracking-wider "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 h-[80px] ">
                {row.getCenterVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                      maxWidth: cell.column.getSize(),
                    }}
                    className="border-r px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden text-ellipsis"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
