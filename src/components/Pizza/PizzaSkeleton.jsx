import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={450}
    viewBox="0 0 280 478"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="135" r="125" />
    <rect x="10" y="283" rx="10" ry="10" width="260" height="30" />
    <rect x="0" y="336" rx="10" ry="10" width="280" height="92" />
    <rect x="0" y="443" rx="10" ry="10" width="102" height="27" />
    <rect x="140" y="440" rx="10" ry="10" width="140" height="35" />
  </ContentLoader>
);

export default PizzaSkeleton;
