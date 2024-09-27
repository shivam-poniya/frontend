import { createContext, useEffect, useState } from "react";


const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');        
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
      }
    }, []);

    const login = (token)=>{       
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem("authToken", token);
    };

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("authToken");
    };

    return(
        <AuthContext.Provider value={{token, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContext, AuthProvider};