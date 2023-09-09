import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useForm } from "react-hook-form";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import styles from "./Login.module.scss";
import { selectIsAuth, fetchRegister } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Tilek",
      email: "",
      password: "",
    },
  });

  // Сохраняем токен в localstorage для авторизации
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      alert("ERROR");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);

      console.log(data.payload.token);
    } else {
      alert("ERROR");
    }
  };

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  if (isAuth === true) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          className={styles.field}
          label="Полное имя"
          {...register("fullName", { required: "Укажите имя" })}
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          className={styles.field}
          label="E-Mail"
          {...register("email", { required: "Укажте почту" })}
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type={showPassword ? "" : "password"}
          className={styles.field}
          label="Пароль"
          {...register("password", { required: "Укажите пороль" })}
          fullWidth
        />
        <IconButton onClick={togglePassword} size="small">
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth>
          Зарегистрироваться
        </Button>
      </Paper>
    </form>
  );
};
