import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../services/productService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al obtener los productos.');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(product => product.id !== id));
                toast.success('Producto eliminado exitosamente');
            } catch (err) {
                setError('Error al eliminar el producto.');
                toast.error('Error al eliminar el producto.');
            }
        }
    };

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h2>Lista de Productos</h2>
            <Link to="/create"><button>Crear Nuevo Producto</button></Link>
            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.quantity}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>
                                    <Link to={`/edit/${product.id}`}><button>Editar</button></Link>
                                    <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay productos disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
