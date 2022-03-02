import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import '../App.css';
import DashNavbar from './DashNavbar';

export default function ProductList() {

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
        <div className='ProducList'>
            {localStorage.getItem('token') && (
                <>
                <DashNavbar />
                    <div className='constainer'>
                        {/* <Link to="/dashboard/add" className="btn btn-success">Add New</Link> */}
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product.id}>
                                        {/* <td>{ index + 1 }</td> */}
                                        <td><img
                                            className="card-thumbnail"
                                            src={product.img_url}
                                        /></td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <Link id={product.id} to={`/dashboard/edit/${product.id}`} className="btn btn-primary">Edit</Link>
                                            <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </>
            )}
            {!localStorage.getItem('token') && (
                <>
                    <p>You must log in first!. </p>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </>
            )}
        </div>
    )
}
