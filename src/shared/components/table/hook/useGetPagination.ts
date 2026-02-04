import { useSearchParams } from 'react-router-dom';

export function useGetPagination() {

    const [searchParams, _setSearchParams] = useSearchParams()

    return `&page=${searchParams.get('page') || 1}&limit=${searchParams.get('limit') || 10}`
}
