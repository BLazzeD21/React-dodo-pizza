import React, { memo } from "react";

type CategoriesProps = {
  selectedCategory: number;
  setSelectedCategory: (id: number) => void;
}

const Categories: React.FC<CategoriesProps> = memo(({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    'All', 'Meet', 'Vegetarian', 'Grill', 'Spicy', 'Pepperoni',
  ];

  return (
    <div className="categories">
      <ul>
        {
          categories.map((category, index) => {
            return (
              <li
                key={index}
                className={selectedCategory === index ? 'active' : ''}
                onClick={() => setSelectedCategory(index)}
              >
                {category}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
})

export default Categories;
