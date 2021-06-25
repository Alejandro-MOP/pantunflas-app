import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';

import { postProduct, updateProduct } from '../services/products.api';

const productState = {
	nombre: '',
	stock: 0,
	nom_provedor: '',
	no_modelo: '',
};

const FormProduct = ({ currentProduct, setCurrentProduct, getAllProducts }) => {
	const [product, setProduct] = useState({});

	useEffect(() => {
		setProduct(
			Object.keys(currentProduct).length === 0
				? productState
				: currentProduct,
		);
	}, [currentProduct]);

	const handleChange = event => {
		const { name, value } = event.target;

		if (name === 'stock') {
			setProduct({
				...product,
				[name]: isNaN(parseInt(value)) ? 0 : parseInt(value),
			});
			return;
		}
		setProduct({
			...product,
			[name]: value,
		});
	};

	const handleSubmit = async () => {
		try {
			await postProduct(product);
			setProduct(productState);
			getAllProducts();
		} catch (error) {
			console.error(error);
			console.error(error.request);
		}
	};

	const handleUpdate = async product => {
		try {
			await updateProduct(product);
			setCurrentProduct({});
			getAllProducts();
			setProduct(productState);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Row>
			<Col md='6'>
				<div className='mt-3'>
					<Input
						className='d-block'
						type='text'
						placeholder='Nombre'
						name='nombre'
						value={product.nombre === '' ? '' : product.nombre}
						style={styles.input}
						onChange={handleChange}
					/>

					<Input
						className='d-block'
						type='text'
						placeholder='Stock'
						name='stock'
						value={product.stock === 0 ? '' : product.stock}
						onChange={handleChange}
						style={styles.input}
					/>

					<Input
						className='d-block'
						type='text'
						name='nom_provedor'
						placeholder='Nombre Provedor'
						value={product.nom_provedor}
						onChange={handleChange}
						style={styles.input}
					/>

					<Input
						className='d-block'
						type='text'
						name='no_modelo'
						placeholder='Numero de Modelo'
						value={product.no_modelo}
						onChange={handleChange}
						style={styles.input}
					/>
					{
						//prettier-ignore
						Object.keys(currentProduct).length === 0
							? (
								<Button
									color='success'
									style={styles.button}
									onClick={handleSubmit}
								>
									Agregar Producto
								</Button>
							)
							: (
								<Button
									color='primary'
									style={styles.button}
									onClick={() => handleUpdate(product)}
								>
									Actualizar Producto
								</Button>
							)
					}
				</div>
			</Col>
		</Row>
	);
};

const styles = {
	input: {
		width: 250,
		margin: '1.2rem 0',
	},
	button: {
		width: 250,
		marginTop: 18,
	},
};

export default FormProduct;
