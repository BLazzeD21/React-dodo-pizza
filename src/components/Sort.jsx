import React, { useState } from 'react';
import arrow from '../assets/arrow.svg';

const Sort = () => {
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [sortBy, setSortBy] = useState(0);
  const sortList = ['popularity', 'price', 'alphabet'];

  const onClickSort = (index) => {
    setSortBy(index);
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
          {sortList[sortBy]}
        </span>
      </div>
      {visibleSelect && (<div className="sort__popup">
        <ul>
          {
            sortList.map((sort, index) => (
              <li
                key={index}
                className={sortBy === index ? 'active' : ''}
                onClick={() => {
                  onClickSort(index);
                }}
              >
                {sort}
              </li>
            ))
          }
        </ul>
      </div>)}
    </div>
  );
};

export default Sort;
