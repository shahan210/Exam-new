import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
export const GlobalProvider = ({ children }) => {
    const [modalComponent, setModalComponent] = useState(false);
    const [loading, setLoading] = useState(false);

    console.log(loading,'loading');

    return (
        <GlobalContext.Provider value={{ modalComponent, setModalComponent, loading, setLoading }}>
            {children}
        </GlobalContext.Provider>
    );
};
