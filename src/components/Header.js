import React from "react";
import "../assets/css/header.css";
import logo from "../assets/images/logo.png";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const { loginState } = useSelector((state) => state);
  return (
    <div>
      <header>
        <div id="hamburgerMenuBtn" className="menuIconContainer">
          <span>
            <i className="fa-solid fa-bars"></i>
          </span>
        </div>
        <div>
          <img src={logo} className="logoContainer" alt="" />
        </div>
        <nav id="navBar">
          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <li>
              <Link to={"/"}>Anasayfa</Link>
            </li>
            <li>
              <a href="./HTML/about.html">Hakkimda</a>
            </li>

            {!loginState.success ? (
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to={"/admin"}>Admin Panel</Link>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      dispatch({ type: actionTypes.loginActions.LOGOUT });
                    }}
                    variant="info"
                  >
                    {loginState.user.username} - Logout
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
