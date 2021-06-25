import axios from 'axios';

const apiUrl = 'http://localhost:8080/products';

//const { data } = await getProducts();
export const getProducts = async () => {
	try {
		const data = await axios.get(apiUrl);
		return data;
	} catch (error) {
		console.error(error);
	}
};

//const { data } = await getProductById(<id>);
export const getProductById = async id => {
	try {
		const data = await axios.get(`${apiUrl}/${id}`);
		return data;
	} catch (error) {
		console.error(error);
	}
};

//const { data } = await updateProduct(product);
export const postProduct = async product => {
	try {
		const data = await axios.post(apiUrl, product);
		return data;
	} catch (error) {
		console.error(error);
	}
};

//const { data } = await updateProduct(product);
export const updateProduct = async product => {
	try {
		const data = await axios.put(apiUrl, product);
		return data;
	} catch (error) {
		console.error(error);
	}
};

//await deleteProduct(1);
export const deleteProduct = async id => {
	try {
		const data = await axios.delete(`${apiUrl}/${id}`);
		return data;
	} catch (error) {
		console.error(error);
	}
};
