import React from "react";
import authStore from "../stores/AuthStore";
import productStore from "../stores/ProductStore";
import basketStore from "../stores/BasketStore";

const StoresContext = React.createContext({});

export const useStores = () => React.useContext(StoresContext);

export default function StoresProvider({ children }) {
  return (
    <StoresContext.Provider value={{ authStore, productStore, basketStore }}>
      {children}
    </StoresContext.Provider>
  );
}
