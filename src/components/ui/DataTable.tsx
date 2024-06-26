import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../@/components/ui/table';

import clsx from 'clsx';
import useWindowWidth from '@/hooks/useWindowWidth';

interface DataTableProps<TData, TValue> {
  isAction: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ isAction, columns, data }: DataTableProps<TData, TValue>) {
  const windowWidh = useWindowWidth();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableColumnStyle = clsx({
    'data-table equal-columns': columns.length <= 6,
    'data-table auto-width-columns': columns.length > 6,
  });

  const renderHeaderForCell = (cell: any) => {
    const column = cell.column.columnDef;
    const headerContext = {
      table,
      column,
      header: table.getHeaderGroups()[0].headers.find((h) => h.id === cell.column.id),
    };
    return flexRender(column.header, headerContext);
  };

  return (
    <div className="table-contents" style={isAction ? { height: `calc(100vh - 250px)` } : { height: `calc(100vh - 200px)` }}>
      {windowWidh < 577 ? (
        <div className="card-layout">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <div className="card" key={row.id}>
                {row.getVisibleCells().map((cell) =>
                  cell.column.columnDef.header != 'Action' ? (
                    <div className="card-cell" key={cell.id}>
                      <span className="card-cell-header">{renderHeaderForCell(cell)}</span>
                      <span className="card-cell-content">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                    </div>
                  ) : (
                    <div className="card-action" key={cell.id}>
                      <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                    </div>
                  ),
                )}
              </div>
            ))
          ) : (
            <div className="card no-results">No results.</div>
          )}
        </div>
      ) : (
        <Table className={clsx('auto-width-columns', tableColumnStyle)}>
          <TableHeader className="tw-border-none text-nowrap">
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
                <TableRow className="tw-rounded-md tw-bg-white tw-whitespace-nowrap tw-text-sm" key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
      )}
    </div>
  );
}
