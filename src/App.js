import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/* for routing pages */
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* pages */
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import Login from "./pages/Login";
import Error from "./pages/Error";

/* api */
import api from "./api/api";
import endpoints from "./api/endpoints";
import "./assets/css/main.css";
import "./assets/css/about.css";
import "./assets/css/blogdetail.css";
import "./assets/css/header.css";

/* redux */
import actionTypes from "./redux/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { blogsState, categoriesState, usersState, loginState } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  useEffect(() => {
    /* fetch blogs */
    dispatch({ type: actionTypes.blogActions.GET_BLOGS_START });
    api
      .get(endpoints.blogs)
      .then((res) =>
        dispatch({
          type: actionTypes.blogActions.GET_BLOGS_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: actionTypes.blogActions.GET_BLOGS_FAIL,
          payload: "Blogları çekerken bir hata oluştu.",
        })
      );
    /* fetch categories */
    dispatch({ type: actionTypes.categoryActions.GET_CATEGORIES_START });
    api
      .get(endpoints.categories)
      .then((res) =>
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_FAIL,
          payload: "Kategorileri çekerken bir hata oluştu",
        })
      );
    /* fetch users */
    dispatch({ type: actionTypes.userActions.GET_USERS_START });
    api
      .get(endpoints.users)
      .then((res) =>
        dispatch({
          type: actionTypes.userActions.GET_USERS_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: actionTypes.userActions.GET_USERS_FAIL,
          payload: "Kullanıcıları çekerken bir hata oluştu",
        })
      );
    /* read login state from localstorage */
    const loginStateFromLocalStorage = JSON.parse(
      localStorage.getItem("loginState")
    );
    if (loginStateFromLocalStorage === null) {
      localStorage.setItem(
        "loginState",
        JSON.stringify({
          pending: false,
          success: false,
          error: false,
          errorMessage: "",
          user: null,
        })
      );
    } else {
      console.log(loginStateFromLocalStorage);
      if (loginStateFromLocalStorage.success) {
        dispatch({
          type: actionTypes.loginActions.LOGIN_SUCCESS,
          payload: loginStateFromLocalStorage.user,
        });
      }
    }
  }, []);
  if (!blogsState.success || !categoriesState.success || !usersState.success)
    return null;
  if (blogsState.error || categoriesState.error || usersState.error)
    return <Error />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
