import React from 'react';
import picture from '../assets/images/dodoEmployee1.svg';
import EmptyBlock from '../components/EmptyBlock';

const NotFound = () => {
  return (
    <EmptyBlock title='PAGE NOT FOUND' image={picture} />
  );
};

export default NotFound;
