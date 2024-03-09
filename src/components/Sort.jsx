import React from 'react'
import arrow from '../assets/arrow.svg';

const Sort = () => {
  return (
    <div className="sort">
    <div className="sort__label">
      <img src={arrow} alt="arrow" className='arrow' />
      <b>Sort by:</b>
      <span>popularity</span>
    </div>
    <div className="sort__popup">
      <ul>
        <li className="active">popularity</li>
        <li>price</li>
        <li>alphabet</li>
      </ul>
    </div>
  </div>
  );
}
 
export default Sort;