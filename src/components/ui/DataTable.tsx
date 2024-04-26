import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table";
import clsx from "clsx";
import IconPrevious from "../../assets/icons/ic-previous.svg";
import IconNext from "../../assets/icons/ic-next.svg";
import { Button } from "react-bootstrap";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const tableColumnStyle = clsx({
    "data-table equal-columns": columns.length <= 6,
    "data-table auto-width-columns": columns.length > 6,
  });
  return (
    <div style={{ maxHeight: "75vh" }}>
      <div className="table-contents">
        <Table className={tableColumnStyle}>
          <TableHeader className="tw-border-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="tw-border-none tw-font-bold tw-py-3 tw-bg-transparent"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="gap-10">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="tw-rounded-md tw-bg-white tw-whitespace-nowrap tw-text-sm hover:tw-cursor-pointer"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="tw-border-none" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="rounded-lg">
                <TableCell
                  colSpan={columns.length}
                  className="tw-h-24 tw-text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4">
        <Button
          className="img-prev"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <img src={IconPrevious} />
        </Button>
        <Button
          className="img-next"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <img src={IconNext} />
        </Button>
      </div>
    </div>
  );
}
