// src/context/AuthContext.jsx
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); 
  const [token , setToken , removeToken] = useLocalStorage("token");
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (data) => {
    setToken("Login SuccessFull");
    navigate("/");
    toast.success("Login SuccessFull");
  };

  const logout = () => {
    setToken("Logout SuccessFull");
    navigate("/login");
    removeToken();
    toast.success("Logout SuccessFull");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
