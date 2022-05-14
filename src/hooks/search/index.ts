type SearchableObject = {
  [key: string]: string | number | string[];
};

type UseSearch = {
  search: (
    key: string,
    queries: Array<string>,
    itemsToSearch: Array<SearchableObject>
  ) => Array<SearchableObject>;
};

function useSearch(): UseSearch {
  const searchMultiple = (
    queries: Array<string>,
    valuesToCompare: Array<Array<string>>,
    itemsToSearch: Array<SearchableObject>
  ) => {
    const mem: Array<number> = [];

    valuesToCompare.forEach((arr, index) => {
      let matchFound = 0;
      for (let j = 0; j < queries.length; j++) {
        if (arr.includes(queries[j])) {
          matchFound++;
        }
      }
      if (matchFound === queries.length) {
        mem.push(index);
      }
    });

    return itemsToSearch.filter((_, i) => mem.includes(i));
  };

  const search = (
    key: string,
    queries: Array<string>,
    itemsToSearch: Array<SearchableObject>
  ) => {
    if (queries.length === 0) return itemsToSearch; //if there is no item to search
    if (queries.length === 1 && typeof itemsToSearch[0][key] === "string")
      //if items to search key is an array of string
      return itemsToSearch.filter((item) =>
        (item[key] as string).toLowerCase().includes(queries[0].toLowerCase())
      );

    // if items to search is array of array of arrays, we use multiple search to loop through it, and return the result
    const valuesToCompare: Array<Array<string>> = [];
    itemsToSearch.forEach(
      (item) =>
        item[key] &&
        item[key] !== ["unknown"] &&
        item[key] !== [""] &&
        (item[key] as Array<unknown>).length > 0 &&
        valuesToCompare.push(item[key] as Array<string>)
    );

    return searchMultiple(queries, valuesToCompare, itemsToSearch);
  };

  return { search }
}

export default useSearch;
