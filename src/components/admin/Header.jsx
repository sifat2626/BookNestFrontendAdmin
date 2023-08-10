import React, { Fragment,useState,useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import user from "../../assets/admin/image/user.png";
import { useAuth } from "../../context/auth";
import { useSearch } from "../../context/search.jsx";
const Header = ({ setSidebarOpen }) => {
  const [searchValue, setSearchValue] = useSearch();
  const location = useLocation();
  // console.log('location', location);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const allowedPaths = ["/product/list", "/user/adminList","/order/list"];
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("intendedRoute");
    setAuth({ ...auth, token: "", user: null });
    navigate("/login");
    window.location.href = "/login";
  };
  useEffect(() => {
    setIsInputDisabled(!allowedPaths.includes(location.pathname));
  }, [location]);
  return (
    <Fragment>
      <div className="container-fluid py-2">
        <div className="app-header-content">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <a
                onClick={() => setSidebarOpen(true)}
                id="sidepanel-toggler"
                className="sidepanel-toggler d-inline-block d-xl-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  role="img"
                >
                  <title>Menu</title>
                  <path
                    stroke="currentColor"
                    // stroke-miterlimit="10"
                    stroke-width="2"
                    d="M4 7h22M4 15h22M4 23h22"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="search-mobile-trigger d-sm-none col">
              <i className="search-mobile-trigger-icon fas fa-search"></i>
            </div>
            <div className="app-search-box col">
              <form className="app-search-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  name="search"
                  // className="form-control search-input"
                  className={isInputDisabled ? "disabled-input form-control search-input" : "form-control search-input"}
                  value={searchValue}
                  placeholder="Search.."
                  disabled={isInputDisabled}
                />
                <button
                  type="submit"
                  className="btn search-btn btn-primary"
                  value="Search"
                >
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>

            <div className="app-utilities col-auto">
              <div className="app-utility-item app-user-dropdown dropdown">
                <a
                  className="dropdown-toggle"
                  id="user-dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  <img
                    src={auth.user ? auth.user.photo : user}
                    alt="user profile"
                    style={{borderRadius:"50%",objectFit:"cover",height:"30px",width:"30px"}}
                  />
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="user-dropdown-toggle"
                >
                  {!auth.user && (
                    <li>
                      <Link className="dropdown-item " to="/" style={{
                        textAlign: "center",
                      }}>
                        Log in
                      </Link>
                    </li>
                  )}
                  {auth.user && (
                    <li>
                      <a
                        className="dropdown-item"
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "rebeccapurple",
                        }}
                        onClick={handleLogout}
                      >
                        Log out
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
