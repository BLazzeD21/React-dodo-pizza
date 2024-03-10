import React, { useState } from 'react';

const Categories = () => {
  const categories = ['All', 'Meet', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

  const [selectedCategory, setSelectedCategory] = useState(0);

  const selectCategory = (index) => {
    setSelectedCategory(index);
  };
  return (
    <div className="categories">
      <ul>
        {
          categories.map((category, index) => {
            return (
              <li
                key={index}
                className={selectedCategory === index ? 'active' : ''}
                onClick={() => selectCategory(index)}
              >
                {category}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Categories;
