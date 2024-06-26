import React from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { setSearchQueue } from "../../store/filter/slice";

export const Search: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState<string>("");

  const searchInput = React.useRef<HTMLInputElement>(null);

  const clearSearchQueue = (): void => {
    setValue("");
    dispatch(setSearchQueue(""));
    searchInput.current?.focus();
  };

  const updateSearchQueue = React.useCallback(
    debounce((queue: string) => {
      dispatch(setSearchQueue(queue));
    }, 250),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
    updateSearchQueue(event.target.value);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchInput.current?.blur();
    }
  };

  return (
    <div className="input__wrapper">
      <svg
        enableBackground="new 0 0 32 32"
        id="Editable-line"
        className="input__search"
        version="1.1"
        viewBox="0 0 32 32"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>

      <input
        ref={searchInput}
        value={value}
        onChange={onChangeInput}
        onKeyDown={handleOnKeyDown}
        className="input"
        placeholder="Search the pizza..."
      />

      <svg
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        className="input__clear"
        onClick={clearSearchQueue}
      >
        <rect fill="none" height="256" width="256" />
        <line
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
          x1="216"
          x2="40"
          y1="56"
          y2="56"
        />
        <line
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
          x1="104"
          x2="104"
          y1="104"
          y2="168"
        />
        <line
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
          x1="152"
          x2="152"
          y1="104"
          y2="168"
        />
        <path
          d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
        <path
          d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
      </svg>
    </div>
  );
});

