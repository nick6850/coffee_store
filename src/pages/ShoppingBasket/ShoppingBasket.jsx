import React, { useEffect } from "react";
import { Table, Button, Space } from "antd";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useStores } from "../../contexts/storesContext";
import styles from "./ShoppingBasket.module.scss";

const ShoppingBasket = observer(() => {
  const { basketStore } = useStores();

  useEffect(() => basketStore.loadBasket(), []);

  const totalPrice = basketStore.calculateRoundedTotalPrice();

  const columns = [
    {
      title: "Название",
      key: "product",
      render: (_, record) => (
        <Space size="middle">
          <span>{record.name}</span>
        </Space>
      ),
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text}`,
    },
    {
      title: "Количество",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Итого",
      key: "total",
      render: (_, record) => (
        <Space>
          <span>${record.price * record.quantity}</span>
          <Button
            onClick={() => basketStore.removeProduct(record.id)}
            type="link"
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.shoppingBasket}>
      <Table
        dataSource={basketStore.selectedProducts}
        columns={columns}
        rowKey="id"
        pagination={false}
        className={styles.basketTable}
        locale={{ emptyText: "Ваша корзина пуста" }}
        scroll={{
          x: 650,
          y: 300,
        }}
      />
      <div className={styles.totalPrice}>
        К оплате: <span style={{ fontWeight: "bold" }}>${totalPrice}</span>
      </div>
      <div className={styles.checkoutLink}>
        {basketStore.selectedProducts.length > 0 && (
          <Button type="primary">
            <Link to="/checkout">Перейти на страницу оплаты</Link>
          </Button>
        )}
      </div>
    </div>
  );
});

export default ShoppingBasket;
