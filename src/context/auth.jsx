import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      setAuth({ ...auth, user: auth?.user, token: auth.token });
      console.log('auth',auth);
    }
  }, []);
  // axios config
  axios.defaults.baseURL = "https://book-nest-backend.onrender.com/api/v1";
  axios.defaults.headers.common["authorization"] = auth?.token;


console.log('auth',auth);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
// const [auth,setAuth]=useAuth()
export { AuthProvider, useAuth };
