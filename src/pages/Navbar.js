import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);
  const navigate = useNavigate();
  //A handler to handle onclick event on logout button
  const handleLogout = () => {
    localStorage.removeItem("token");
    //after logout when you remove the token from localStorage, redirect to the login page
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
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
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {
              // if there is no token in the localStorage, token item means no user is logged in , then show Login and SignUp buttons
              !localStorage.getItem("token") ? (
                <form className="d-flex">
                  <div>
                    <Link
                      className="btn btn-primary mx-1"
                      to="/login"
                      role="button"
                    >
                      LogIn
                    </Link>
                    <Link
                      className="btn btn-primary mx-1"
                      to="/signup"
                      role="button"
                    >
                      SignUp
                    </Link>
                  </div>
                </form>
              ) : (
                // if there is token in the localStorage, token item means user is logged in , then show Logged in User name and Logout button
                <button className="btn btn-primary mx-1" onClick={handleLogout}>
                  Logout
                </button>
              )
            }
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
