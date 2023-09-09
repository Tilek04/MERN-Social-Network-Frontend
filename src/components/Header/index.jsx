import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { logaout, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logaout());
      window.localStorage.removeItem("token")
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>DZHENISHEV BLOG</div>
          </a>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <a href="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </a>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <a href="/login">
                  <Button variant="outlined">Войти</Button>
                </a>
                <a href="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
