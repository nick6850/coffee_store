import React from "react";
import { Table } from "antd";
import { observer } from "mobx-react";
import { useStores } from "../../contexts/storesContext";
import styles from "./Profile.module.scss";

const Profile = observer(() => {
  const { authStore, purchaseHistoryStore } = useStores();

  const columns = [
    {
      title: "Дата покупки",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Наименования",
      dataIndex: "purchases",
      key: "purchases",
      render: (purchases) => (
        <span>
          {purchases.map(({ displayText }) => displayText).join(", ")}
        </span>
      ),
    },
    {
      title: "Сумма покупки",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `$${totalPrice}`,
    },
  ];

  const purchaseHistory = purchaseHistoryStore.getPurchaseHistory(
    authStore.user.id
  );

  return (
    <div className={styles.profile}>
      <h1 className={styles.title}>
        Здравствуйте,
        <span style={{ fontWeight: "bold" }}>{authStore.user.name}</span>! Ваша
        история покупок:
      </h1>
      <Table
        className={styles.table}
        dataSource={purchaseHistory}
        columns={columns}
        locale={{ emptyText: "История покупок пока пуста 😢" }}
        rowKey="id"
        scroll={{
          x: 650,
          y: 300,
        }}
        pagination={false}
      />
    </div>
  );
});

export default Profile;
