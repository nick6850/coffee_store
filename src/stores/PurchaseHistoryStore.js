import { makeAutoObservable } from "mobx";

class PurchaseHistoryStore {
  constructor() {
    makeAutoObservable(this);
  }

  addPurchase(userId, date, purchases) {
    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || {};
    const totalPrice = purchases
      .reduce((acc, { price, quantity }) => acc + price * quantity, 0)
      .toFixed(2);

    if (!history[userId]) {
      history[userId] = [];
    }

    const formattedDateTime = new Date(date).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    history[userId].unshift({ date: formattedDateTime, purchases, totalPrice });

    localStorage.setItem("purchaseHistory", JSON.stringify(history));
  }

  getPurchaseHistory(userId) {
    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || {};

    return history[userId] || [];
  }
}

const purchaseHistoryStore = new PurchaseHistoryStore();
export default purchaseHistoryStore;
