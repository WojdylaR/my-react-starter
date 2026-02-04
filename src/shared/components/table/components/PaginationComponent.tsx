import {type Table as TableType} from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function PaginationComponent({ table } : { table: TableType<any>}) {

    const [searchParams, setSearchParams] = useSearchParams()

    const pageIndex = table.getState().pagination.pageIndex

    const isUpdatingFromUrl = useRef(false)

    useEffect(() => {
        const urlPage = searchParams.get('page')
        if (urlPage) {
            const pageNum = parseInt(urlPage) - 1
            if (pageNum !== pageIndex && pageNum >= 0) {
                isUpdatingFromUrl.current = true
                table.setPageIndex(pageNum)
            }
        }
    }, [searchParams])

    useEffect(() => {
        if (isUpdatingFromUrl.current) {
            isUpdatingFromUrl.current = false
            return
        }
        
        const currentPage = (pageIndex + 1).toString()
        const urlPage = searchParams.get('page')
        
        if (urlPage !== currentPage) {
            setSearchParams(prev => {
                const newParams = new URLSearchParams(prev)
                newParams.set('page', currentPage)
                return newParams
            })
        }
    }, [pageIndex])


    return <span className='pagination'>

        <button 
            className={`pagination-button ${table.getCanPreviousPage() ? '' : 'disabled'}`} 
            onClick={() => table.previousPage()} 
            disabled={!table.getCanPreviousPage()}>
                Précédent
        </button>
        {table.getCanPreviousPage() &&
            <>
                <button 
                    className='pagination-button' 
                    onClick={() => table.setPageIndex(0)} 
                    disabled={!table.getCanPreviousPage()}>
                        1
                </button>

            
               
                {table.getState().pagination.pageIndex > 1 &&
                    <>
                        <div className='separator'>
                        ...
                        </div>
                        <button 
                            className='pagination-button side-page' 
                            onClick={() => table.previousPage()} 
                            >
                                {table.getState().pagination.pageIndex}
                        </button>
                    </>
                }
            </>
        }
        <button className='actual-page pagination-button'>{table.getState().pagination.pageIndex + 1}</button>

        {table.getCanNextPage() && <>
            {table.getState().pagination.pageIndex < table.getPageCount() - 2 &&
            <>
                <button 
                    className='pagination-button side-page' 
                    onClick={() => table.nextPage()} 
                    >
                        {table.getState().pagination.pageIndex + 2}
                </button>
                <div className='separator'>
                    ...
                </div>
            </>
            }
            <button 
                className='pagination-button' 
                onClick={() => table.setPageIndex(table.getPageCount() - 1)} 
                disabled={!table.getCanNextPage()}>
                    {table.getPageCount()}
            </button>

        </>}
        <button
            className={`pagination-button ${table.getCanNextPage() ? '' : 'disabled'}`} 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()}>
                Suivant
        </button>


    </span>
}

export default PaginationComponent;