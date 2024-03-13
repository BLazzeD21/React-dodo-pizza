const Categories = ({ selectedCategory, setSelectedCategory }) => {
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
};

export default Categories;
