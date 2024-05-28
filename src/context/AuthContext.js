import { createContext, useContext } from 'react';
import { useSelector } from "react-redux";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const user = useSelector(state => state.auth);

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};