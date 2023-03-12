import React from "react";
import Header from "../components/Header";

import { useSelector } from "react-redux";
import CategoriesSection from "../components/CategoriesSection";

const Home = () => {
  const { loginState } = useSelector((state) => state);
  return (
    <div>
      <Header />
      <main className="mainContainer">
        <CategoriesSection />
        <section className="rightSide"></section>
      </main>
    </div>
  );
};

export default Home;
