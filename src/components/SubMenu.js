import React from "react";
import { Link } from "react-router-dom";

import styles from "../assets/css/subMenu.module.css";

const SubMenu = ({ isAdmin }) => {
  return (
    <div className={styles.subMenuWrapper}>
      <Link to={"/admin"}>Blog Islemleri</Link>
      {isAdmin && (
        <Link to="/admin/category-operations ">Kategori Islemleri</Link>
      )}
    </div>
  );
};

export default SubMenu;
