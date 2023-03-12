import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AdminHome = () => {
  const { loginState } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginState.success) navigate("/login");
  }, [loginState]);

  return (
    <div>
      <Header />
      <h1>Admin Anasayfa</h1>
    </div>
  );
};

export default AdminHome;
