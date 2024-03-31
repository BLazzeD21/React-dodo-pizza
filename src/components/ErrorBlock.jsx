import React from 'react';
import picture from '../assets/images/dodoPlanet.svg';
import EmptyBlock from './EmptyBlock';

const ErrorBlock = () => {
  return (
    <EmptyBlock
      title='Failed to receive products'
      image={picture}
    />
  );
};

export default ErrorBlock;
