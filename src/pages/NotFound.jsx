import React from 'react';
import lineLogo from '../assets/dodoPizzaLine.svg';
import picture from '../assets/dodoEmployee1.svg';

const NotFound = () => {
  return (
    <div className="NotFound">
      <div className="NotFound__title">
        PAGE NOT FOUND
      </div>
      <div className="NotFound__img">
        <img src={picture} alt='picture' width={'100%'}/>
        <img src={lineLogo} alt='dodo pizza'/>
      </div>
    </div>
  );
};

export default NotFound;
