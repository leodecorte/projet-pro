import { useState } from 'react'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import DashNavbar from './DashNavbar';


const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const navigate = useNavigate();

    const saveProduct = async (e) => {

        const formData = new FormData();
        formData.append('file', file);
        formData.append("fileName", fileName);
        formData.append('name', name)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('price', price)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        e.preventDefault();
        await axios.post('http://localhost:3005/products', formData, config)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            });
        navigate("/dashboard");
    }

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    return (

        <>
            {localStorage.getItem('token') && (
                <>
                    <DashNavbar />
                    <div className='container'>
                        <form onSubmit={saveProduct}>
                            <div className="field">
                                <label className="label">Name</label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Name"
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
                                {/* <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
                                    <option selected>Open this select menu</option>
                                    <option value="entree">entree</option>
                                    <option value="plat">plat</option>
                                    <option value="desert">desert</option>
                                </select> */}
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
                                <button className="btn btn-primary">Save</button>
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

        </>
    )
}

export default AddProduct