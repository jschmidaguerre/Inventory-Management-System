// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importar estilos globales
import 'react-toastify/dist/ReactToastify.css'; // Estilos de React Toastify

// Crear la raíz del DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la aplicación dentro de React.StrictMode para resaltar potenciales problemas
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
