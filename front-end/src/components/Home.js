import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import ProductList from './ProductList'; 

export default function List() {

    const [products, setProducts] = useState([]);
 
    useEffect(() => {
        getProducts();
    }, []);
 
    const getProducts = async () => {
        const response = await axios.get('http://localhost:3005/products');
        setProducts(response.data);
    }
 
    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:3005/products/${id}`);
        getProducts();
    }
 
    return (
        <div className='constainer'>
            <Link to="/add" className="btn btn-success">Add New</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    { products.map((product, index) => (
                        <tr key={ product.id }>
                            {/* <td>{ index + 1 }</td> */}
                            <td>{ product.name }</td>
                            <td>{ product.description }</td>
                            <td>{ product.category }</td>
                            <td>{ product.price }</td>
                            <td>
                                <Link to={`/edit/${product.id}`} className="btn btn-outline-primary">Edit</Link>
                                <button onClick={ () => deleteProduct(product.id) } className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
    )
}
