import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './styles/main.scss'
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
  </HashRouter>
);
