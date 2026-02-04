    import { 
        useReactTable, 
        type Table as TableType,
        getSortedRowModel,
        getCoreRowModel,
        getPaginationRowModel, 
        getFilteredRowModel, 
        flexRender } from '@tanstack/react-table';

    import type { ITable } from './tableInterfaces';
    import PaginationComponent from './components/PaginationComponent';
    import { useState } from 'react';

    function TableComponent<T>({data, columns, onRowClick = null}: ITable<T>) {

        const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

        const table: TableType<any>  = useReactTable({
            columns: columns,
            data: data.data,
            getCoreRowModel: getCoreRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            onPaginationChange: setPagination,
            manualPagination: true,
            rowCount: data.meta.totalCount,
            columnResizeMode:"onChange",
            state: {
                pagination
            }
        })

        return (
            <div className="table-container">
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup =>
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header =>
                                    <th style={{ width: header.getSize() }} key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        <div 
                                        onMouseDown={header.getResizeHandler()} 
                                        onTouchStart={header.getResizeHandler()}
                                        className={`resizer ${header.column.getIsResizing() && 'isResizing'}`} />
                                    </th>
                                )}
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {
                            table.getRowModel().rows.map(row => 
                                <tr className={onRowClick ? 'onRowClick' : ''}  onClick={() => onRowClick && onRowClick(row.original)} key={row.id}>
                                    {row.getVisibleCells().map(cell =>
                                        <td style={{ width: cell.column.getSize() }} key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )}
                                </tr>
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <PaginationComponent table={table} />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }

    export default TableComponent