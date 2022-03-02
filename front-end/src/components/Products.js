import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Products() {

    const [entree, setEntree] = useState([]);
    const [plat, setPlat] = useState([]);
    const [desert, setDesert] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get('http://localhost:3005/products');
        setProducts(response.data);
        let entrees = response.data.reverse().find(product => product.category === 'entree');
        setEntree(entrees)
        let plats = response.data.reverse().find(product => product.category === 'plat');
        setPlat(plats)
        let deserts = response.data.reverse().find(product => product.category === 'desert');
        setDesert(deserts)
    }

    // const getEntree = async () => {
    //     const response = await axios.get('http://localhost:3005/products/');
        // setEntree(response.data)
        // setProducts(response.data);
        // let entrees = response.find(product => product.category === 'entree')
        // let plats = response.find(product => product.category === 'plat');
        // console.log(plats)
        // console.log(deserts)
    // }
    // const getPlat = async () => {
    //     const response = await axios.get('http://localhost:3005/products/plat');
    //     setPlat(response.data[0])
    // }

    // const getDesert = async () => {
    //     const response = await axios.get('http://localhost:3005/products');
    //     let deserts = response.data.reverse().find(product => product.category === 'desert');
    //     setDesert(deserts)
    //     // console.log(response.data)
    // }
    // console.log(entree)
    // console.log(plat)
    // console.log(desert)



    return (
        // <!-- Products-->
        <section id="products" className="my-5 px-5 pb-5">

            <div className="card my-5 px-5 pb-5">
                <div className="card-body">
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                        Menu du Jour
                    </h2>
                    <p className="text-center w-responsive mx-auto mb-5">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>

                    {/* First Dish */}
                    <div key={entree.id}>
                        <div className="row">
                            <div className="col lg-5">
                                <div className="card-img rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                                    <img
                                        className="img-fluid"
                                        // src="https://mdbootstrap.com/img/Photos/Others/img%20(27).webp"
                                        src={entree.img_url}
                                        alt=""
                                    />
                                    <a href="#!">
                                        <div overlay="white-slight" />
                                    </a>
                                </div>
                            </div>
                            <div className="col lg-7">
                                <a href="#!" className="text-decoration-none text-uppercase green-text">
                                    <h6 className="fw-bold mb-3">
                                        <div icon="utensils" className="pr-2" />
                                        {entree.category}
                                    </h6>
                                </a>
                                <h3 className="font-weight-bold mb-3 p-0">
                                    <strong>{entree.name}</strong>
                                </h3>
                                <p>{entree.description}.
                                    Nam libero tempore, cum soluta nobis est eligendi optio cumque
                                    nihil impedit quo minus id quod maxime placeat facere possimus,
                                    omnis voluptas assumenda est, omnis dolor repellendus et aut
                                    officiis debitis.
                                </p>
                            </div>
                        </div>

                        {/* Second Dish */}
                        <hr className="my-5" />
                        <div className="row">
                            <div className="col lg-7">
                                <a href="#!" className="text-decoration-none text-uppercase pink-text">
                                    <h6 className="fw-bold mb-3">
                                        <div icon="image" className="pr-2" />
                                        {plat.category}
                                    </h6>
                                </a>
                                <h3 className="font-weight-bold mb-3 p-0">
                                    <strong>{plat.name}</strong>
                                </h3>
                                <p>{plat.description}.
                                    At vero eos et accusamus et iusto odio dignissimos ducimus qui
                                    blanditiis praesentium voluptatum deleniti atque corrupti quos
                                    dolores et quas molestias excepturi sint occaecati cupiditate
                                    non provident.
                                </p>
                            </div>
                            <div className="col lg-5" >
                                <div className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                                    <img
                                        className="img-fluid"
                                        src={plat.img_url}
                                        alt=""
                                    />
                                    <a href="#!">
                                        <div overlay="white-slight" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Third Dish */}
                        <hr className="my-5" />
                        <div className="row">
                            <div className="col lg-5">
                                <div className="card-img rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                                    <img
                                        className="img-fluid"
                                        src={desert.img_url}
                                        alt=""
                                    />
                                    <a href="#!">
                                        <div overlay="white-slight" />
                                    </a>
                                </div>
                            </div>
                            <div className="col lg-7">
                                <a href="#!" className="text-decoration-none text-uppercase green-text">
                                    <h6 className="fw-bold mb-3">
                                        <div icon="utensils" className="pr-2" />
                                        {desert.category}
                                    </h6>
                                </a>
                                <h3 className="font-weight-bold mb-3 p-0">
                                    <strong>{desert.name}</strong>
                                </h3>
                                <p>{desert.description}.
                                    Nam libero tempore, cum soluta nobis est eligendi optio cumque
                                    nihil impedit quo minus id quod maxime placeat facere possimus,
                                    omnis voluptas assumenda est, omnis dolor repellendus et aut
                                    officiis debitis.
                                </p>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </section>




    )
}