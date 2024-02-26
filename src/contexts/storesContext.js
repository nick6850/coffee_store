import React from "react";
import authStore from "../stores/AuthStore";

const StoresContext = React.createContext({});

export const useStores = () => React.useContext(StoresContext);

export default function StoresProvider({ children }) {
  return (
    <StoresContext.Provider value={{ authStore }}>
      {children}
    </StoresContext.Provider>
  );
}
