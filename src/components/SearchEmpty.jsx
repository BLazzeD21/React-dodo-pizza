import React from 'react';
import image from '../assets/images/dodoQualityControl5.svg';

const SearchEmpty = ({ searchQueue }) => {
  return (
    <div className="empty" style={{ padding: '0' }}>
      <div className="empty__title">
        {`No matches for "${searchQueue}"`}
      </div>
      <div >
        <img src={image} alt='picture' width={'100%'}/>
      </div>
    </div>
  );
};

export default SearchEmpty;
