import React, { useEffect, useRef, useState } from 'react';
import arrow from '../assets/icons/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectSortType, setSortType } from '../store/slices/filterSlice';
import { sortTypes } from '../utils/sortTypes';

const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const sortType = useSelector(selectSortType);

  const sortRef = useRef<HTMLDivElement>(null);
  const [visibleSelect, setVisibleSelect] = useState<boolean>(false);

  const onClickSort = (type: sort): void => {
    dispatch(setSortType(type));
    setVisibleSelect(false);
  };


  const handleClickOutside = (event: MouseEvent): void => {
    if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
      setVisibleSelect(false);
    }
  };
  
  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <img
          src={arrow}
          alt="arrow"
          className={visibleSelect ? 'arrow rotate' : 'arrow '}
        />
        <b>Sort by:</b>
        <span onClick={() => setVisibleSelect(!visibleSelect)}>
          {sortType.name}
        </span>
      </div>
      {visibleSelect && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((type, index) => (
              <li
                key={index}
                className={sortType.name === type.name ? 'active' : ''}
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
};

export default Sort;
