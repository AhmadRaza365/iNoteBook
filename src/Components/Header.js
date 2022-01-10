import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import "./Header.css";

function Header() {
  let location = useLocation();
  let history = useHistory();
  const clickOnLogout = () => {
    localStorage.removeItem('token');
    history.push("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid mx-3">
        <Link className="navbar-brand   fs-2" to="/">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav fs-3">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                } `}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                } `}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/contact" ? "active" : ""
                } `}
                to="/contact"
              >
                Contact Me
              </Link>
            </li>

            {!localStorage.getItem("token") ? (
              <ul className="fs-3">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/login" ? "active" : ""
                    } `}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/signup" ? "active" : ""
                    } `}
                    to="/signup"
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            ) : (
             <button className="btn btn-primary" onClick={clickOnLogout} >Logout</button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
