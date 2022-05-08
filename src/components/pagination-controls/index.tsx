import { useEffect, useState } from "react";
import { StyledUnorderedList } from "./styles";

type Props = {
  perPage: number;
  totalCount: number;
  onSelectpage: (pageNumber: number) => void;
};

const PaginationControls = ({ perPage, totalCount, onSelectpage }: Props) => {
  const [isValidProps, setIsValidProps] = useState(false);

  useEffect(() => {
    if (totalCount < 1 || perPage < 1) return;
    setIsValidProps((previousValue) => !previousValue);
  }, [totalCount, perPage]);

  const getPageCountListElement = () => {
    const listCount = totalCount / perPage;

    return [...Array(listCount)].map((_, index) => {
      const pageNumber = index + 1;
      return (
        <li key={index} onClick={() => onSelectpage(pageNumber)}>
          {pageNumber}
        </li>
      );
    });
  };

  return (
    <>
      {isValidProps && (
        <StyledUnorderedList>{getPageCountListElement()}</StyledUnorderedList>
      )}
    </>
  );
};

export default PaginationControls;
