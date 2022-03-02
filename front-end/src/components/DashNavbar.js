import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

export default function DashNavbar() {
    return (
        <>
            {localStorage.getItem('token') && (
                <>
                    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                        {/* <!-- Navbar Brand--> */}
                        <a className="navbar-brand ps-3" href="/dashboard">Dashboard</a>
                        {/* <!-- Sidebar Toggle--> */}
                        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
                        {/* <!-- Navbar Search--> */}
                        <div class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                        </div>
                        {/* <!-- Navbar--> */}
                        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                            <li className="nav-item"><a href="/dashboard/add" className="nav-link">Add New Product</a></li>
                            <li className="nav-item"><a href="/" className="nav-link">Logout</a></li>
                        </ul>
                    </nav>
                </>
            )
            }
            {!localStorage.getItem('token') && (
                <>
                    <p>You must log in first!. </p>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </>
            )}
        </>



    )
}
