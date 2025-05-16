import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./Login"; // Adjust the import path as necessary
import AdminContent from "./AdminContent";

const AdminLogic = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsuscribe();
  }, []);

  return <>{user ? <AdminContent user={user} /> : <Login />}</>;
};

export default AdminLogic;
