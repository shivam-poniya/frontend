import { createContext, useState } from "react";


const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (userData, token)=>{
        setUser(userData);
        setToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("authToken");
    };

    return(
        <AuthContext.Provider value={{user,  token, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContext, AuthProvider};