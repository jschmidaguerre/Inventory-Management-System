// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <h2>Inventory Management</h2>
            <div>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/create" style={styles.link}>Crear Producto</Link>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
    },
    link: {
        margin: '0 10px',
        color: '#fff',
        textDecoration: 'none',
    }
};

export default Navbar;
