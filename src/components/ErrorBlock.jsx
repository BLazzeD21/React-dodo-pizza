import React from 'react';
import picture from '../assets/images/dodoPlanet.svg';
import EmptyBlock from './EmptyBlock';

const ErrorBlock = () => {
  return (
    <EmptyBlock
      title='Error receiving data from server'
      image={picture}
    />
  );
};

export default ErrorBlock;