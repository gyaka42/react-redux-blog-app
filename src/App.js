import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/* routing stuff */
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* pages */
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import Login from "./pages/Login";
import Error from "./pages/Error";
import AddBlog from "./pages/AddBlog";
import BlogDetail from "./pages/BlogDetail";

/* api stuff */
import api from "./api/api";
import endpoints from "./api/endpoints";
import "./assets/css/main.css";
import "./assets/css/header.css";
import "./assets/css/blogdetail.css";
import "./assets/css/about.css";

/* redux stuff */
import actionTypes from "./redux/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { blogsState, categoriesState, usersState } = useSelector(
    (state) => state
  );
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
    /* read loginState from localstorage */
    const loginStateFromLocalstorage = JSON.parse(
      localStorage.getItem("loginState")
    );
    if (loginStateFromLocalstorage === null) {
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
      if (loginStateFromLocalstorage.success) {
        dispatch({
          type: actionTypes.loginActions.LOGIN_SUCCESS,
          payload: loginStateFromLocalstorage.user,
        });
      }
    }
  }, []);
  if (!blogsState.success || !categoriesState.success || !usersState.success)
    return null;
  /* todo: return error page if datas didn't get fetched */
  if (blogsState.error || categoriesState.error || usersState.error)
    return <Error />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-blog" element={<AddBlog />} />
        <Route path="/blog/:blogId" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
