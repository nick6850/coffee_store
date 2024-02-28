import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, message, Spin } from "antd";
import { observer } from "mobx-react";
import NotFound from "../NotFound/NotFound";
import { useStores } from "../../contexts/storesContext";
import styles from "./ProductDetails.module.scss";

const ProductDetails = observer(() => {
  const { productStore, basketStore } = useStores();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const productDetails = productStore.findById(parseInt(id));
    if (!productDetails) {
      setNotFound(true);
    } else {
      setProduct(productDetails);
      setNotFound(false);
    }
    setLoading(false);
  }, [id, productStore]);

  if (loading) {
    return (
      <div className={styles.productDetails}>
        <Spin tip="Загрузка..." />
      </div>
    );
  }

  if (notFound) {
    return <NotFound />;
  }

  const handleAddToBasket = () => {
    basketStore.addProduct(product);
    message.success(`Добавили ${product.name} в корзину :)`, 5);
  };

  return (
    <div className={styles.productDetails}>
      <Card
        hoverable
        className={styles.productCard}
        cover={<img alt={product.name} src={`/assets/images/${product.img}`} />}
      >
        <Card.Meta
          title={product.name}
          description={
            <div className={styles.description}>{product.description}</div>
          }
        />
        <div className={styles.otherInfo}>
          <p>
            Категория:
            <span style={{ fontWeight: "bold" }}>{product.category}</span>
          </p>
          <p>
            Цена: <span style={{ fontWeight: "bold" }}>${product.price}</span>
          </p>
          <div className={styles.actions}>
            <Button onClick={() => navigate(-1)}>К списку товаров</Button>
            <Button type="primary" onClick={handleAddToBasket}>
              Добавить в корзину
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
});

export default ProductDetails;
