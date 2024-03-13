import React, { useState } from 'react';
import arrow from '../assets/arrow.svg';

const Sort = ({ sortTypes, sortBy, setSortBy }) => {
  const [visibleSelect, setVisibleSelect] = useState( false );

  const onClickSort = (type) => {
    setSortBy(type);
    setVisibleSelect(!visibleSelect);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <img
          src={arrow}
          alt="arrow"
          className={visibleSelect ? 'arrow rotate' : 'arrow '}
        />
        <b>Sort by:</b>
        <span onClick={() => setVisibleSelect(!visibleSelect)}>
          {sortBy.name}
        </span>
      </div>
      {visibleSelect && (<div className="sort__popup">
        <ul>
          {
            sortTypes.map((type, index) => (
              <li
                key={index}
                className={sortBy.name === type.name ? 'active' : ''}
                onClick={() => {
                  onClickSort(type);
                }}
              >
                {type.name}
              </li>
            ))
          }
        </ul>
      </div>)}
    </div>
  );
};

export default Sort;
