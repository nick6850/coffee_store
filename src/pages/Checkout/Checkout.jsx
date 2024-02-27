import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Input, Button, Spin, Result, Form, Row, Col } from "antd";
import { observer } from "mobx-react-lite";
import { useStores } from "../../contexts/storesContext";
import styles from "./Checkout.module.scss";

const Checkout = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { basketStore, authStore, purchaseHistoryStore } = useStores();

  const onFinish = () => {
    setIsLoading(true);
    setTimeout(() => {
      const userId = authStore.user.id;
      const purchases = basketStore.selectedProducts.map(
        ({ id, name, price, quantity }) => ({
          id,
          name,
          price,
          quantity,
          displayText: `${name}${quantity > 1 ? ` (${quantity})` : ""}`,
        })
      );

      setIsLoading(false);
      setIsSuccess(true);
      purchaseHistoryStore.addPurchase(userId, new Date(), purchases);
      basketStore.clearBasket();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <Result
        status="success"
        title="Покупка успешно завершена!"
        subTitle="Вы можете посмотреть свою историю покупок в вашем личном кабинете."
        extra={[
          <Button type="primary">
            <Link to="/profile">Перейти в личный кабинет</Link>
          </Button>,
        ]}
      />
    );
  }

  return (
    <div className="checkoutContainer">
      <Row justify="center" className="checkout-row">
        <Col xs={22} sm={18} md={14} lg={10} xl={8}>
          <Card
            title="Страница оплаты"
            bordered={false}
            className="checkout-card"
          >
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <Spin />
              </div>
            ) : (
              <>
                <h1
                  style={{
                    marginBottom: "1rem",
                    fontSize: "0.7rem",
                  }}
                >
                  Введите данные карты:
                </h1>
                <Form onFinish={onFinish}>
                  <Form.Item
                    name="cardNumber"
                    label="Номер карты"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, введите номер вашей карты",
                      },
                      {
                        len: 16,
                        message: "Номер карты должен содержать 16 цифр",
                      },
                      {
                        pattern: /^\d+$/,
                        message: "Номер карты должен содержать только цифры",
                      },
                    ]}
                  >
                    <Input placeholder="1234 1234 1234 1234" maxLength={16} />
                  </Form.Item>
                  <Form.Item
                    name="expiryDate"
                    label="Срок действия"
                    rules={[
                      { required: true },
                      {
                        pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                        message: "Неверный формат даты, используйте MM/YY",
                      },
                    ]}
                  >
                    <Input placeholder="MM/YY" maxLength={5} />
                  </Form.Item>
                  <Form.Item
                    name="cvv"
                    label="CVV"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, введите CVV код",
                      },
                      { len: 3, message: "CVV код должен содержать 3 цифры" },
                      {
                        pattern: /^\d{3}$/,
                        message: "CVV код должен содержать только цифры",
                      },
                    ]}
                  >
                    <Input type="password" maxLength={3} />
                  </Form.Item>
                  <Form.Item style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">
                      Оплатить ${basketStore.calculateRoundedTotalPrice()}
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default Checkout;
