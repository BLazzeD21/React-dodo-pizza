import React from 'react';
import logo from '../assets/icons/dodoPizza.svg';
import cart from '../assets/icons/cartWhite.svg';
import { Link } from 'react-router-dom';
import Input from './Input';

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img src={logo} width={'70px'} alt="dodo-pizza" />
            <div>
              <h1>Dodo Pizza</h1>
              <p>Fast free delivery to home and office</p>
            </div>
          </div>
        </Link>
        <Input />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>0 $</span>
            <div className="button__delimiter"></div>
            <img src={cart} className="basket" width={'22px'} alt="basket" />
            <span>0</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
