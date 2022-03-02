/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams, Link } from 'react-router-dom';
import DashNavbar from './DashNavbar';

const EditProduct = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    
    const navigate = useNavigate();
    const { id } = useParams();

    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3005/products/${id}`, {
            name,
            description,
            category,
            price
        });
        navigate("/dashboard");
    }

    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:3005/products/${id}`);
        // setProduct(response.data);
        console.log(response)
        setName(response.data[0].name)
        setDescription(response.data[0].description);
        setCategory(response.data[0].category);
        setPrice(response.data[0].price);
    }

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    return (
        <div>
            {localStorage.getItem('token') && (
                <>
                    <DashNavbar />
                    <div className='container'>
                        <form onSubmit={updateProduct}>

                            <div className="field">
                                <label className="label">Title</label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>



                            <div className="field">
                                <label className="label">Description</label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label className="label">Category</label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label className="label">Price</label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div class="custom-file">
                            <input type="file" className="form-control" id="formFile" onChange={saveFile} />
                                <label className="form-label" for="formFile">Choose file</label>
                            </div>

                            <div className="field">
                                <button className="btn btn-primary">Update</button>
                            </div>
                        </form>
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

export default EditProduct