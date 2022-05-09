import { useCallback } from "react";

type UsePaginate = {
  paginate: (
    arr: Array<unknown>, //so this can be used for any type of Array
    perPage: number,
    currentPage: number
  ) => Array<unknown>;
};

function usePaginate(): UsePaginate {
  const paginate = useCallback((
    arr: Array<unknown>,
    perPage: number,
    currentPage: number
  ) => {
    if (perPage < 1) throw new Error('Pagination config`s perPage must be more than 0')
    if (perPage > arr.length) return arr
    if (currentPage < 1) throw new Error('Pagination config`s currentPage must be more than 0')

    const availablePages = Math.round((arr.length / perPage))
    if (currentPage > availablePages) throw new Error('Pagination config`s currentPage is out of bound, enter a lower page number')

    const startIndex = perPage * (currentPage - 1);
    const endIndex = startIndex + perPage;
    return arr.slice(startIndex, endIndex);
  }, []);

  return { paginate };
}

export { usePaginate };
