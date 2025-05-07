import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; // Adjust the import path as necessary

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuario logueado:", userCredential.user);
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}

export default Login;