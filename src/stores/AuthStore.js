import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

class UserStore {
  user = null;
  isSignedIn = false;

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
      this.isSignedIn = true;
    }
  }

  signUp(name, password) {
    const id = uuidv4();
    const user = { id, name, password };
    if (name.length < 3 || password.length < 3) {
      throw new Error(
        "Имя пользователя и пароль должны быть длиннее 3 символов"
      );
    }
    localStorage.setItem("user", JSON.stringify(user));
    this.user = user;
    this.isSignedIn = true;
  }

  signIn(name, password) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name === name && user.password === password) {
      this.user = user;
      this.isSignedIn = true;
    } else {
      throw new Error("Неверное имя пользователя или пароль");
    }
  }

  signOut() {
    this.user = null;
    this.isSignedIn = false;
    localStorage.removeItem("user");
  }
}

const authStore = new UserStore();
export default authStore;
