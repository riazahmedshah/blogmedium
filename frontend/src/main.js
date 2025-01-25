import { jsx as _jsx } from "react/jsx-runtime";
//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from './components/UserContext';
createRoot(document.getElementById('root')).render(_jsx(UserProvider, { children: _jsx(App, {}) }));
