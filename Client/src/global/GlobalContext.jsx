import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [modalComponent, setModalComponent] = useState(false);
    const [login, setLogin] = useState(false);

    let get = localStorage.getItem("access");
    let token = localStorage.getItem("token");
    const check = () => {
        if (get === "denied") {
            localStorage.removeItem("token");
            localStorage.removeItem("access");
            setLogin(true);
        } else if (token == undefined || token?.length == 0) {
            setLogin(true);
            localStorage.removeItem("token");
            localStorage.removeItem("access");
        } else {
            setLogin(false);
        }
    };
    useEffect(() => {
        check();
    }, [get, token]);

    return (
        <GlobalContext.Provider value={{ login, setLogin, modalComponent, setModalComponent, loading, setLoading }}>
            {children}
        </GlobalContext.Provider>
    );
};
