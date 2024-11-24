// src/components/ProductForm.js

import React, { useState, useEffect } from 'react';
import { createProduct, getProductById, updateProduct } from '../../services/productService';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        quantity: 0,
        price: 0.0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    const fetchProduct = async (id) => {
        setLoading(true);
        try {
            const response = await getProductById(id);
            setProduct(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al obtener el producto.');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: name === 'quantity' || name === 'price' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (id) {
                await updateProduct(id, product);
                toast.success('Producto actualizado exitosamente');
            } else {
                await createProduct(product);
                toast.success('Producto creado exitosamente');
            }
            navigate('/');
        } catch (err) {
            setError('Error al guardar el producto.');
            toast.error('Error al guardar el producto.');
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Procesando...</p>;
    }

    return (
        <div>
            <h2>{id ? 'Editar Producto' : 'Crear Producto'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Descripción:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        style={styles.textarea}
                    ></textarea>
                </div>
                <div style={styles.formGroup}>
                    <label>Cantidad:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                        min="0"
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Precio:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        min="0"
                        style={styles.input}
                    />
                </div>
                <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
            </form>
        </div>
    );
};

const styles = {
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        padding: '8px',
        height: '100px',
        boxSizing: 'border-box',
    }
};

export default ProductForm;
