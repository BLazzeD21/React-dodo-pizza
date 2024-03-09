import Categories from './components/Categories';
import Header from './components/Header';
import Pizza from './components/Pizza';
import Sort from './components/Sort';
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
            <Pizza />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
