import React from 'react';
import { Button, Table } from 'reactstrap';
import { deleteProduct } from '../services/products.api';

const TableProduct = ({ products, setProducts, setCurrentProduct }) => {
	const handleDelete = async id => {
		try {
			await deleteProduct(id);
			const currentProducts = products.filter(
				product => product.id !== id,
			);
			setProducts(currentProducts);
		} catch (error) {}
	};

	return (
		<div className='mt-5 pt-3'>
			<h2 className='text-center text-primary'>Inventario</h2>
			<Table hover>
				<thead className='text-center thead-dark'>
					<tr>
						<th>#</th>
						<th>Nombre</th>
						<th>Stock</th>
						<th>Nombre Proveedor</th>
						<th>No. Modelo</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{products.map(product => (
						<tr key={product.id} className='text-center'>
							<th scope='row'>{product.id}</th>
							<td>{product.nombre}</td>
							<td>{product.stock}</td>
							<td>{product.nom_provedor}</td>
							<td>{product.no_modelo}</td>
							<td>
								<Button
									color='danger'
									onClick={() => handleDelete(product.id)}
								>
									Eliminar
								</Button>
							</td>
							<td>
								<Button
									color='warning'
									onClick={() => setCurrentProduct(product)}
								>
									Editar
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default TableProduct;
