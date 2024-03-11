import Categories from './components/Categories';
import Header from './components/Header';
import Pizza from './components/Pizza';
import Sort from './components/Sort';
import pizzas from './assets/pizzas.json';
import './styles/styles.scss';

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {pizzas.map((pizzaObject) => (
              <Pizza
                key={pizzaObject.id}
                {...pizzaObject} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
