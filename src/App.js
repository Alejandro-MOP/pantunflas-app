import { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import FormProduct from './components/FormProduct';
import Navbar from './components/Navbar';
import TableProduct from './components/TableProduct';
import { getProducts } from './services/products.api';

const App = () => {
	const [products, setProducts] = useState([]);
	const [currentProduct, setCurrentProduct] = useState({});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getAllProducts(), []);

	const getAllProducts = async () => {
		try {
			const { data } = await getProducts();
			setProducts(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Navbar />

			<Container className='d-flex flex-column justify-content-between align-items-center my-3'>
				<FormProduct
					currentProduct={currentProduct}
					setCurrentProduct={setCurrentProduct}
					getAllProducts={getAllProducts}
				/>
				{products.length !== 0 ? (
					<TableProduct
						products={products}
						setProducts={setProducts}
						setCurrentProduct={setCurrentProduct}
					/>
				) : (
					<p className='text-center text-success mt-5'>
						No hay productos en el inventario, agrega uno.
					</p>
				)}
			</Container>
		</>
	);
};

// const styles = {};

export default App;
