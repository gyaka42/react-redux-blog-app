import React from "react";

import { useSelector } from "react-redux";

const CategoriesSection = () => {
  const { categoriesState } = useSelector((state) => state);
  return (
    <section className="leftSide">
      <div className="categoriesTitleContainer">
        <p>Kategoriler</p>
      </div>
      <ul className="categoriesList">
        {categoriesState.categories.map((item) => (
          <li key={item.id}>
            <a href="#">{item.name}</a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoriesSection;
