import React, { useState, useEffect } from "react";

import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

import Header from "../components/Header";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usersState, loginState } = useSelector((state) => state);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (loginState.success === true) navigate("/");
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const hasUser = usersState.users.find(
      (item) => item.username === form.username
    );
    if (hasUser === undefined) {
      alert("Boyle bir Kullanici bulunamadi");
      return;
    }
    if (hasUser.password !== form.password) {
      alert("Sifreniz yanlistir.");
      return;
    }
    /* Login Basarili */
    dispatch({
      type: actionTypes.loginActions.LOGIN_SUCCESS,
      payload: { username: hasUser.username, role: hasUser.role },
    });
    const successLoginState = {
      pending: false,
      success: true,
      error: false,
      errorMessage: "",
      user: { username: hasUser.username, role: hasUser.role },
    };
    localStorage.setItem("loginState", JSON.stringify(successLoginState));
    navigate("/");
  };

  return (
    <div>
      <Header />
      <Container>
        <h1 className="my-5 text-center">Login Sayfasi</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={form.username}
              onChange={(event) =>
                setForm({ ...form, username: event.target.value })
              }
              placeholder="Enter Username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={form.password}
              onChange={(event) => {
                setForm({ ...form, password: event.target.value });
              }}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          <div className="my-5 d-flex justify-content-center">
            <Button className="w-50" variant="primary" type="submit">
              Login
            </Button>
          </div>
          <div className="my-5 d-flex justify-content-center">
            <Link to={"/"}>Ana sayfaya don</Link>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
