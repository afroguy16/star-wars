import { useEffect, useState } from "react";
import ButtonText from "../button-text";
import { StyledPaginationControlsWrapper } from "./styles";

type Props = {
  perPage: number;
  totalCount: number;
  onSelectPage: (pageNumber: number) => void;
};

const PaginationControls = ({ perPage, totalCount, onSelectPage }: Props) => {
  const [isValidProps, setIsValidProps] = useState(false);
  const [listCount, setListCount] = useState(totalCount / perPage);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (totalCount < 1 || perPage < 1) return;
    setIsValidProps((previousValue) => !previousValue);
    setListCount(totalCount / perPage);
  }, [totalCount, perPage]);

  const isActivePage = (pageNumber: number) => pageNumber === activePage;

  const getPageCountListElement = () => {
    return [...Array(listCount)].map((_, index) => {
      const pageNumber = index + 1;
      return (
        <li
          key={index}
          className={isActivePage(pageNumber) ? "active" : ""}
          onClick={() => handleOnSelectPages(pageNumber)}
        >
          <ButtonText text={pageNumber.toString()} />
        </li>
      );
    });
  };

  const hasUpToTwoPage = () => listCount > 1;

  const handleOnSelectPages = (pageNumber: number) => {
    setActivePage(pageNumber);
    onSelectPage(pageNumber);
  };

  return (
    <>
      {isValidProps && (
        <StyledPaginationControlsWrapper>
          {hasUpToTwoPage() && (
            <ButtonText text="<"
              onClick={() => handleOnSelectPages(activePage - 1)}
              disabled={activePage < 2}
            />
          )}
          <ul className="pagination-list-item">{getPageCountListElement()}</ul>
          {hasUpToTwoPage() && (
            <ButtonText
              text=">"
              onClick={() => handleOnSelectPages(activePage + 1)}
              disabled={activePage === listCount}
            />
          )}
        </StyledPaginationControlsWrapper>
      )}
    </>
  );
};

export default PaginationControls;
