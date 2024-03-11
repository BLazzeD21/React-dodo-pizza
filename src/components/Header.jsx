import React from 'react';
import logo from '../assets/dodo-pizza.svg';
import cart from '../assets/cart.svg';

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <img src={logo} width={'70px'} alt="dodo-pizza" />
          <div>
            <h1>Dodo Pizza</h1>
            <p>Fast free delivery to home and office</p>
          </div>
        </div>
        <div className="header__cart">
          <a href="/cart.html" className="button button--cart">
            <span>0 $</span>
            <div className="button__delimiter"></div>
            <img
              src={cart}
              className="basket"
              width={'22px'}
              alt="basket"
            />
            <span>0</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
