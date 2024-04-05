import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { sortTypes } from "../utils/sortTypes";

import { selectSortType } from "../store/filter/selectors";
import { setSortType } from "../store/filter/slice";

import arrow from "../assets/icons/arrow.svg";

const Sort: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const sortType = useSelector(selectSortType);

  const sortRef = React.useRef<HTMLDivElement>(null);
  const [visibleSelect, setVisibleSelect] = React.useState<boolean>(false);

  const onClickSort = (type: sort): void => {
    dispatch(setSortType(type));
    setVisibleSelect(false);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
      setVisibleSelect(false);
    }
  };

  const handleSetVisibleSelect = () => setVisibleSelect(!visibleSelect);

  React.useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <img
          src={arrow}
          alt="arrow"
          className={visibleSelect ? "arrow rotate" : "arrow "}
        />
        <b>Sort by:</b>
        <span onClick={handleSetVisibleSelect}>{sortType.name}</span>
      </div>
      {visibleSelect && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((type, index) => (
              <li
                key={index}
                className={sortType.name === type.name ? "active" : ""}
                onClick={() => {
                  onClickSort(type);
                }}
              >
                {type.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
