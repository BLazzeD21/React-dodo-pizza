import React from "react";
import lineLogo from "../assets/images/dodoPizzaLine.svg";
import { Link } from "react-router-dom";

type EmptyBlockProps = {
  title: string;
  image: string;
};

const EmptyBlock: React.FC<EmptyBlockProps> = ({ title, image }) => {
  return (
    <div className="empty">
      <div className="empty__title">{title}</div>
      <div className="empty__img">
        <img src={image} alt="picture" width={"100%"} />
        <img src={lineLogo} alt="dodo pizza" />
      </div>
      <div className="empty__btn">
        <Link to="/" className="button button--outline button--add go-back-btn">
          <span>Menu</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyBlock;
