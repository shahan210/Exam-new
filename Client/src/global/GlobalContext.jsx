import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
export const GlobalProvider = ({ children }) => {
  const [modalComponent, setModalComponent] = useState(false);
  console.log(modalComponent);
  return (
    <GlobalContext.Provider value={{ modalComponent, setModalComponent }}>
      {children}
    </GlobalContext.Provider>
  );
};
