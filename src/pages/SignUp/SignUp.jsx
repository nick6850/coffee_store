import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { observer } from "mobx-react";
import styles from "./SignUp.module.scss";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { useStores } from "../../contexts/storesContext";

const SignUp = observer(() => {
  const { authStore } = useStores();
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = (values) => {
    try {
      authStore.signUp(values.username, values.password);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (authStore.isSignedIn) {
    return <Navigate to="/" />;
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setErrorMessage("Заполните все поля формы");
  };

  return (
    <div className={styles.formContainer}>
      <Form
        className={styles.form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 className={styles.title}>Регистрация</h1>
        <Form.Item
          label="Логин"
          name="username"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите ваш логин!",
            },
            {
              min: 3,
              message: "Имя пользователя должно быть не менее 3 символов",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш пароль!" },
            { min: 3, message: "Пароль должен быть не менее 3 символов" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
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
        <p style={{ textAlign: "center" }}>
          Уже есть аккаунт? Войдите <Link to="/login">здесь</Link>.
        </p>
      </Form>
    </div>
  );
});

export default SignUp;
