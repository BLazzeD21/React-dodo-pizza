import React from "react";

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  pages: number;
};

export const Pagination: React.FC<PaginationProps> = ({ page, setPage, pages }) => {
  const startArrowHandle = (): void => {
    if (page !== 0) setPage(page - 1);
  };

  const endArrowHandle = (): void => {
    if (page !== pages - 1) setPage(page + 1);
  };

  return (
    <div className="pagination__wrapper">
      <div className="pagination">
        <div
          className={
            page !== 0
              ? "pagination__page"
              : "pagination__page pagination__page--blocked"
          }
          onClick={startArrowHandle}
        >
          {"<"}
        </div>

        {[...new Array(pages)].map((_, index) => (
          <div
            key={index}
            className={
              index === page
                ? "pagination__page pagination__page--active"
                : "pagination__page"
            }
            onClick={() => setPage(index)}
          >
            {index + 1}
          </div>
        ))}

        <div
          className={
            page !== pages - 1
              ? "pagination__page"
              : "pagination__page pagination__page--blocked"
          }
          onClick={endArrowHandle}
        >
          {">"}
        </div>
      </div>
    </div>
  );
};

