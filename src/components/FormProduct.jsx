import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import { postProduct } from '../services/products.api';

const productState = {
	nombre: '',
	stock: 0,
	nom_provedor: '',
	no_modelo: '',
};

const FormProduct = ({ currentProduct, getAllProducts }) => {
	const [product, setProduct] = useState(productState);

	useEffect(() => {
		setProduct(currentProduct);
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

	return (
		<Row>
			<Col md='6'>
				<div className='mt-3'>
					<Input
						className='d-block'
						type='text'
						placeholder='Nombre'
						name='nombre'
						value={product.nombre}
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

					<Button
						color='success'
						style={styles.button}
						onClick={handleSubmit}
					>
						Agregar Producto
					</Button>
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
