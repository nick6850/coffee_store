import { Row, Col, Card, Select, Button, Layout, message } from "antd";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useStores } from "../../contexts/storesContext";
import styles from "./Home.module.scss";

const { Option } = Select;
const { Header, Content } = Layout;

const Home = observer(() => {
  const { productStore, basketStore } = useStores();
  const [selectedCategory, setSelectedCategory] = useState("Категория");
  const [selectedSort, setSelectedSort] = useState("Цена");

  const categoryOptions = ["Кофе", "Кофемашины", "Другое"];
  const sortOptions = ["Возрастание", "Убывание"];

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    productStore.filterByCategory(value);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
    const direction = value === "Возрастание" ? "asc" : "desc";
    productStore.sortByPrice(direction);
  };

  const handleAddToBasket = (product) => {
    basketStore.addProduct(product);
    message.success(`Добавили ${product.name} в корзину :)`, 2);
  };

  const handleResetFilters = () => {
    setSelectedCategory("Категория");
    setSelectedSort("По цене");
    productStore.resetFilters();
  };

  return (
    <Layout className={styles.homeLayout}>
      <Header className={styles.filtersHeader}>
        <div className={styles.filterControls}>
          <Select
            value={selectedCategory}
            className={styles.filterSelect}
            onChange={handleCategoryChange}
            popupMatchSelectWidth={false}
          >
            {categoryOptions.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>

          <Select
            value={selectedSort}
            className={styles.filterSelect}
            onChange={handleSortChange}
            popupMatchSelectWidth={false}
          >
            {sortOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>

          <Button className={styles.filterSelect} onClick={handleResetFilters}>
            Без фильтров
          </Button>
        </div>
      </Header>
      <Content style={{ margin: "24px 16px 0" }}>
        <Row gutter={[16, 16]}>
          {productStore.filteredProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={12} lg={8} xl={6}>
              <Card
                hoverable
                className={styles.productCard}
                cover={
                  <img
                    alt={product.name}
                    src={`/assets/images/${product.img}`}
                    className={styles.productImage}
                  />
                }
              >
                <Card.Meta
                  title={product.name}
                  className={styles.productMeta}
                  description={
                    <>
                      <p>{`$${product.price}`}</p>
                      <p>Категория: {product.category}</p>
                    </>
                  }
                />
                <div className={styles.actions}>
                  <Link to={`/${product.id}`} className={styles.detailsLink}>
                    Подробнее
                  </Link>
                  <Button
                    onClick={() => handleAddToBasket(product)}
                    className={styles.addToBasket}
                  >
                    Добавить в корзину
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
});

export default Home;
