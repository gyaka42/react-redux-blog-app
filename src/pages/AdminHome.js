import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import SubMenu from "../components/SubMenu";
import ListBlogs from "../components/ListBlogs";

const AdminHome = () => {
  const { loginState } = useSelector((state) => state);
  console.log(loginState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginState.success) navigate("/login");
  }, [loginState]);

  return (
    <div>
      <Header />
      <SubMenu isAdmin={loginState?.user?.role === "admin" ? true : false} />
      <ListBlogs />
    </div>
  );
};

export default AdminHome;
