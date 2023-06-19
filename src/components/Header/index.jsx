import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";

export const Header = () => {
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>DZHENISHEV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            <Link to="/login">
            <Button variant="outlined">Войти</Button>
            </Link>
           <Link to="/register">
           <Button variant="contained">Создать аккаунт</Button>
           </Link>
           
          </div>
        </div>
      </Container>
    </div>
  );
};
