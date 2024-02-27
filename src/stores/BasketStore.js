import { makeAutoObservable } from "mobx";

class BasketStore {
  selectedProducts = [];

  constructor() {
    makeAutoObservable(this);
  }

  addProduct(product) {
    const existingProduct = this.selectedProducts.find(
      (p) => p.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.selectedProducts.push({ ...product, quantity: 1 });
    }
  }

  removeProduct(productId) {
    const productIndex = this.selectedProducts.findIndex(
      (p) => p.id === productId
    );
    if (productIndex !== -1) {
      if (this.selectedProducts[productIndex].quantity > 1) {
        this.selectedProducts[productIndex].quantity -= 1;
      } else {
        this.selectedProducts = this.selectedProducts.filter(
          (p) => p.id !== productId
        );
      }
    }
  }

  calculateTotalPrice() {
    return this.selectedProducts.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
  }

  calculateRoundedTotalPrice() {
    return this.calculateTotalPrice().toFixed(2);
  }

  clearBasket() {
    this.selectedProducts = [];
  }
}

const basketStore = new BasketStore();
export default basketStore;
