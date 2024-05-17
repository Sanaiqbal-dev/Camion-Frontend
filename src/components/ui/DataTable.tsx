import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../@/components/ui/table';

import clsx from 'clsx';

interface DataTableProps<TData, TValue> {
  isAction: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ isAction, columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableColumnStyle = clsx({
    'data-table equal-columns': columns.length <= 6,
    'data-table auto-width-columns': columns.length > 6,
  });

  return (
    <div className="table-contents" style={isAction ? { height: `calc(100vh - 250px)` } : { height: `calc(100vh - 200px)` }}>
      <Table className={tableColumnStyle}>
        <TableHeader className="tw-border-none">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="tw-border-none tw-font-bold tw-py-3 tw-bg-transparent" key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="gap-10">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className="tw-rounded-md tw-bg-white tw-whitespace-nowrap tw-text-sm hover:tw-cursor-pointer" key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="tw-border-none" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="rounded-lg">
              <TableCell colSpan={columns.length} className="tw-h-24 tw-text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
