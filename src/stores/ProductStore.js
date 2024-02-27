import { makeAutoObservable } from "mobx";
import products from "../assets/data/products";

class ProductStore {
  products = products;
  filteredProducts = products;
  currentSortDirection = "asc";

  constructor() {
    makeAutoObservable(this);
  }

  findById(id) {
    return this.products.find((product) => product.id === id);
  }

  filterByCategory(category) {
    this.filteredProducts = this.products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    this.sortByPrice(this.currentSortDirection);
  }

  sortByPrice(direction = "asc") {
    this.currentSortDirection = direction;
    this.filteredProducts = this.filteredProducts.slice().sort((a, b) => {
      return direction === "asc" ? a.price - b.price : b.price - a.price;
    });
  }

  resetFilters() {
    this.filteredProducts = this.products;
    this.sortByPrice(this.currentSortDirection);
  }
}

const productStore = new ProductStore();
export default productStore;
