import { createContext, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ value, children }) {
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}