import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const restauranteId = "bruta";

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Funciones de login/logout (mock)
  const login = (usuario) => setUser(usuario);
  const logout = () => setUser(null);

  // Flags derivados del usuario
  const isAdmin = !!user;

  return (
    <AuthContext.Provider value={{ user, isAdmin,restauranteId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar más fácil el contexto
export const useAuth = () => useContext(AuthContext);
