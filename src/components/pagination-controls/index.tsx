import { useEffect, useState } from "react";
import ButtonText from "../button-text";
import { StyledPaginationControlsWrapper } from "./styles";

const DEFAULT_ACTIVE_PAGE = 1;

type Props = {
  parentControlledActivePage?: number;
  perPage: number;
  totalCount: number;
  onSelectPage: (pageNumber: number) => void;
};

const PaginationControls = ({
  parentControlledActivePage,
  perPage,
  totalCount,
  onSelectPage,
}: Props) => {
  const [isValidProps, setIsValidProps] = useState(false);
  const [roundedPageCount, setRoundedPageCount] = useState(Math.ceil(totalCount/perPage));
  const [activePage, setActivePage] = useState(
    parentControlledActivePage
      ? parentControlledActivePage
      : DEFAULT_ACTIVE_PAGE
  );

  useEffect(() => {
    parentControlledActivePage && setActivePage(parentControlledActivePage);
  }, [parentControlledActivePage]);

  useEffect(() => {
    if (totalCount < 1 || perPage < 1) {
      setIsValidProps(false);
      return;
    }
    setIsValidProps(true);
    setRoundedPageCount(getRoundedPageCount());
  }, [totalCount, perPage]);

  const isActivePage = (pageNumber: number) => pageNumber === activePage;

  const getRoundedPageCount = () => Math.ceil(totalCount/perPage)

  const getPageCountListElement = () => {
    const roundedPageCount = getRoundedPageCount()
    return [...Array(roundedPageCount)].map((_, index) => {
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

  const hasUpToTwoPage = () => roundedPageCount > 1;

  const handleOnSelectPages = (pageNumber: number) => {
    setActivePage(pageNumber);
    onSelectPage(pageNumber);
  };

  return (
    <>
      {isValidProps && (
        <StyledPaginationControlsWrapper>
          {hasUpToTwoPage() && (
            <ButtonText
              text="<"
              onClick={() => handleOnSelectPages(activePage - 1)}
              disabled={activePage < 2}
            />
          )}
          <ul className="pagination-list-item">{getPageCountListElement()}</ul>
          {hasUpToTwoPage() && (
            <ButtonText
              text=">"
              onClick={() => handleOnSelectPages(activePage + 1)}
              disabled={activePage === roundedPageCount}
            />
          )}
        </StyledPaginationControlsWrapper>
      )}
    </>
  );
};

export default PaginationControls;
