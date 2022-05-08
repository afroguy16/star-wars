type UsePaginate = {
  paginate: (
    arr: Array<unknown>, //so this can be used for any type of Array
    perPage: number,
    currentPage: number
  ) => Array<unknown>;
};

function usePaginate(): UsePaginate {
  const paginate = (
    arr: Array<unknown>,
    perPage: number,
    currentPage: number
  ) => {
    const startIndex = perPage * (currentPage - 1);
    const endIndex = startIndex + perPage;
    return arr.slice(startIndex, endIndex);
  };

  return { paginate };
}

export { usePaginate };
