import React from "react";


export default function Navbar() {
    // <!-- Navigation-->
    return (
        // <!-- Navigation-->
        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top py-3" id="mainNav">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="#about">Chez Toi</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item"><a href="#about" className="nav-link">About</a></li>
                        <li className="nav-item"><a href="#products" className="nav-link">Products</a></li>
                        <li clasName="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>

    )

}

{/* <template>
  <nav
    class="
      navbar navbar-expand-md navbar-dark
      flex-column flex-md-row
      bd-navbar
      fixed-top
      bg-dark
    "
    style=""
  >
    <div class="container-fluid">
      
          <a class="navbar-brand" href="#">Let the Music Play</a>
        
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarCollapse" class="navbar-collapse collapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link 
            to="/login"
            class="nav-link"
            >
              <i class="fas fa-user text-white"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/"
            class="nav-link"
            >
              <i class="fas fa-shopping-bag text-white"></i
            ></router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="user"
              :to="{ name: 'Edit', params: { id: user._id } }"
            >
              <i class="fas fa-house-user text-white"></i
            ></router-link>
          </li>
        </ul>
        <form class="d-flex" @submit.prevent="onClick">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="query"
          />
          <button class="btn btn-outline-primary" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template> */}