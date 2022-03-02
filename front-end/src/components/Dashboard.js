import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
import '../App.css';


export default function Dashboard() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)

    const [productList, setProductList] = useState([])

    const addProduct = () => {
        axios.post('http://localhost:3005/products', {
            name,
            description,
            category,
            price
        })
            .then((res) => {
                console.log(res)
            })
    }

    const getProducts = () => {
        axios.get('http://localhost:3005/products')
            .then((response) => {
                setProductList(response.data)
                console.log(response.data)
            })
    }

    return (
        <div className='dashboard'>

            {localStorage.getItem('token') && (
                <>
                    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                        {/* <!-- Navbar Brand--> */}
                        <a className="navbar-brand ps-3" href="/">Dashboard</a>
                        {/* <!-- Sidebar Toggle--> */}
                        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
                        {/* <!-- Navbar--> */}
                        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#!">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                    {/* // Products */}
                    <div className='container'>
                        <div className='row'>
                            <label for="name">Name :</label>
                            <input type="text" id="name" name="name" onChange={(event) => {
                                setName(event.target.value)
                            }} />
                            <label for="description">Description :</label>
                            <input type="text" id="description" name="description" onChange={(event) => {
                                setDescription(event.target.value)
                            }} />
                            <label for="category">Category :</label>
                            <input type="text" id="category" name="category" onChange={(event) => {
                                setCategory(event.target.value)
                            }} />
                            <label for="price">Price :</label>
                            <input type="number" id="age" name="age" onChange={(event) => {
                                setPrice(event.target.value)
                            }} />

                            <button type="submit" value="Submit" onClick={addProduct} >Submit</button>
                        </div>

                        <div className='row'>
                            <div>
                                <button type="submit" value="Submit" onClick={getProducts} >Products</button>
                            </div>
                            <div>
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                    </tr>

                                    {productList.map((product, key) => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.category}</td>
                                            <td>{product.price}</td>
                                        </tr>
                                    ))}


                                </table>
                            </div>
                        </div>
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