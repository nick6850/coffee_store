import React, { useState, useEffect } from "react";
import { Layout, Button, Dropdown } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LoginOutlined,
  HomeOutlined,
  MoreOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { observer } from "mobx-react";
import { useStores } from "../../contexts/storesContext";
import styles from "./Layout.module.scss";

const { Header, Content, Footer } = Layout;

const AppLayout = observer(() => {
  const { authStore } = useStores();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onLogoutClick = () => {
    authStore.signOut();
  };

  const menuItems = [
    {
      key: "home",
      label: (
        <Link to="/">
          <HomeOutlined /> Главная
        </Link>
      ),
    },
    {
      key: "profile",
      label: (
        <Link to="/profile">
          <UserOutlined /> Профиль
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <Link onClick={onLogoutClick} to={"/signup"}>
          <LogoutOutlined /> Выйти
        </Link>
      ),
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Link to="/" className={styles.logo}>
          ☕ <span className={styles.title}>Coffee Store</span>
        </Link>
        <div className={styles.navLinks}>
          {isMobile ? (
            authStore.isSignedIn ? (
              <div className={styles.mobileNav}>
                <Link to="/basket" className={styles.basket}>
                  <ShoppingCartOutlined className={styles.basketIcon} /> Корзина
                </Link>
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <MoreOutlined className={styles.dropdownIcon} />
                  </a>
                </Dropdown>
              </div>
            ) : (
              <Link to="/login" className={styles.loginMobile}>
                <LoginOutlined /> Войти
              </Link>
            )
          ) : authStore.isSignedIn ? (
            <>
              <Link to="/basket" className={styles.basket}>
                <ShoppingCartOutlined className={styles.basketIcon} /> Корзина
              </Link>
              <Link to="/profile">
                <UserOutlined /> Профиль
              </Link>
              <Link to="/" className={styles.homeLink}>
                <HomeOutlined /> Главная
              </Link>
              <Button onClick={onLogoutClick}>Выйти</Button>
            </>
          ) : (
            <Link to="/login">
              <LoginOutlined /> Войти
            </Link>
          )}
        </div>
      </Header>
      <Content className={styles.content}>
        <div className={styles.siteLayoutContent}>
          <Outlet />
        </div>
      </Content>
      <Footer className={styles.footer}>
        &copy; Made by Никита with ❤️ and ☕️
      </Footer>
    </Layout>
  );
});

export default AppLayout;
