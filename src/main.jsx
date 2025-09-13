import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
);
