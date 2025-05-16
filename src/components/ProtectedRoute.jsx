import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {
    const [user, userSet] = useState(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            userSet(currentUser || null);
        });

        return () => unsubscribe();
    }, []);

    if (user === undefined) return <p>Cargando...</p>;

    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;