// import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard'
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Login from "./components/Login";
import FileUpload from "./components/FileUpload";

import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>

      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <About />
              <Products />
              <Contact />
            </>
          } />
          <Route path="/dashboard" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/add" element={<AddProduct />} />
          <Route path="/dashboard/edit/:id" element={<EditProduct />} />
          <Route path="/fileupload" element={<FileUpload />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>

      </div>


    </Router>
  );
}

export default App;
