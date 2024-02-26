import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { observer } from "mobx-react";
import { useStores } from "../../contexts/storesContext";
import { Link, Navigate } from "react-router-dom";
import styles from "./Login.module.scss";

const Login = observer(() => {
  const { authStore } = useStores();
  const [errorMessage, setErrorMessage] = useState("");

  if (authStore.isSignedIn) {
    return <Navigate to="/" />;
  }

  const onFinish = (values) => {
    try {
      authStore.signIn(values.username, values.password);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Form
        name="login"
        className={styles.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите ваше имя пользователя!",
            },
          ]}
        >
          <Input placeholder="Имя пользователя" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш пароль!" },
          ]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.loginButton}
          >
            Войти
          </Button>
        </Form.Item>
        {errorMessage && (
          <Alert
            message="Ошибка"
            description={errorMessage}
            type="error"
            showIcon
          />
        )}
        <p className={styles.registerLink}>
          Нет аккаунта? Зарегистрируйтесь <Link to="/signup">здесь</Link>.
        </p>
      </Form>
    </div>
  );
});

export default Login;
