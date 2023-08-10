import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ show, setShow, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Fragment>
      <div
        onClick={() => setSidebarOpen(false)}
        id="sidepanel-drop"
        className="sidepanel-drop"
      ></div>
      <div className="sidepanel-inner d-flex flex-column">
        <a
          onClick={() => setSidebarOpen(false)}
          id="sidepanel-close"
          className="sidepanel-close d-xl-none"
        >
          &times;
        </a>
        <div className="app-branding">
          <Link className="app-logo" to="/">
            <span className="logo-text">BOOKNEST</span>
          </Link>
        </div>
        <nav id="app-nav-main" class="app-nav app-nav-main flex-grow-1">
          <ul className="app-menu list-unstyled accordion" id="menu-accordion">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  (pathname === "/" || pathname.includes("dashboard")) &&
                  "active"
                }`}
              >
                <span className="nav-icon">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-house-door"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />
                  </svg>
                </span>
                <span className="nav-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/order/list"
                className={`nav-link ${
                  (pathname === "/order/list" || pathname.includes("order")) &&
                  "active"
                }`}
              >
                <span className="nav-icon">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-card-list"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                    />
                    <circle cx="3.5" cy="5.5" r=".5" />
                    <circle cx="3.5" cy="8" r=".5" />
                    <circle cx="3.5" cy="10.5" r=".5" />
                  </svg>
                </span>
                <span className="nav-link-text">Orders</span>
              </Link>
            </li>
            <li className="nav-item has-submenu">
              <div
                onClick={() => (show === 0 ? setShow(null) : setShow(0))}
                className={`nav-link submenu-toggle ${
                  pathname.includes("category") && "active"
                }`}
                data-bs-toggle="collapse"
                data-bs-target="#submenu-1"
                aria-expanded={show === 0 ? true : false}
                aria-controls="submenu-1"
              >
                <span className="nav-icon">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-folder"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />
                    <path
                      fill-rule="evenodd"
                      d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z"
                    />
                  </svg>
                </span>
                <span className="nav-link-text">Category</span>
                <span className="submenu-arrow">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-chevron-down"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </div>
              <div
                id="submenu-1"
                className={`collapse submenu submenu-1 ${show === 0 && "show"}`}
                data-bs-parent="#menu-accordion"
              >
                <ul className="submenu-list list-unstyled">
                  <li className="submenu-item">
                    <Link
                      to="/category/create"
                      className={`submenu-link ${
                        pathname === "/category/create" && "active"
                      }`}
                    >
                      Create Category
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link
                      to="/category/list"
                      className={`submenu-link ${
                        pathname === "/category/list" && "active"
                      }`}
                    >
                      Category List
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item has-submenu">
              <div
                onClick={() => (show === 1 ? setShow(null) : setShow(1))}
                className={`nav-link submenu-toggle ${
                  pathname.includes("author") && "active"
                }`}
                data-bs-toggle="collapse"
                data-bs-target="#submenu-2"
                aria-expanded={show === 1 ? true : false}
                aria-controls="submenu-2"
              >
                <span className="nav-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pen-fill"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                  </svg>
                </span>
                <span className="nav-link-text">Author</span>
                <span className="submenu-arrow">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-chevron-down"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </div>
              <div
                id="submenu-2"
                className={`collapse submenu submenu-2 ${show === 1 && "show"}`}
                data-bs-parent="#menu-accordion"
              >
                <ul className="submenu-list list-unstyled">
                  <li className="submenu-item">
                    <Link
                      to="/author/create"
                      className={`submenu-link ${
                        pathname === "/author/create" && "active"
                      }`}
                    >
                      Create Author
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link
                      to="/author/list"
                      className={`submenu-link ${
                        pathname === "/author/list" && "active"
                      }`}
                    >
                      Author List
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item has-submenu">
              <div
                onClick={() => (show === 2 ? setShow(null) : setShow(2))}
                className={`nav-link submenu-toggle ${
                  pathname.includes("publisher") && "active"
                }`}
                data-bs-toggle="collapse"
                data-bs-target="#submenu-3"
                aria-expanded={show === 2 ? true : false}
                aria-controls="submenu-3"
              >
                <span className="nav-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-mailbox2"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M9 8.5h2.793l.853.854A.5.5 0 0 0 13 9.5h1a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H9v1z" />{" "}
                    <path d="M12 3H4a4 4 0 0 0-4 4v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a4 4 0 0 0-4-4zM8 7a3.99 3.99 0 0 0-1.354-3H12a3 3 0 0 1 3 3v6H8V7zm-3.415.157C4.42 7.087 4.218 7 4 7c-.218 0-.42.086-.585.157C3.164 7.264 3 7.334 3 7a1 1 0 0 1 2 0c0 .334-.164.264-.415.157z" />
                  </svg>
                </span>
                <span className="nav-link-text">Publisher</span>
                <span className="submenu-arrow">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-chevron-down"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </div>
              <div
                id="submenu-3"
                className={`collapse submenu submenu-3 ${show === 2 && "show"}`}
                data-bs-parent="#menu-accordion"
              >
                <ul className="submenu-list list-unstyled">
                  <li className="submenu-item">
                    <Link
                      to="/publisher/create"
                      className={`submenu-link ${
                        pathname === "/publisher/create" && "active"
                      }`}
                    >
                      Create Publisher
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link
                      to="/publisher/list"
                      className={`submenu-link ${
                        pathname === "/publisher/list" && "active"
                      }`}
                    >
                      Publisher List
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item has-submenu">
              <div
                onClick={() => (show === 3 ? setShow(null) : setShow(3))}
                className={`nav-link submenu-toggle ${
                  pathname.includes("product") && "active"
                }`}
                data-bs-toggle="collapse"
                data-bs-target="#submenu-4"
                aria-expanded={show === 3 ? true : false}
                aria-controls="submenu-4"
              >
                <span className="nav-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-book"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                  </svg>
                </span>
                <span className="nav-link-text">Product</span>
                <span className="submenu-arrow">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-chevron-down"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </div>
              <div
                id="submenu-4"
                className={`collapse submenu submenu-4 ${show === 3 && "show"}`}
                data-bs-parent="#menu-accordion"
              >
                <ul className="submenu-list list-unstyled">
                  <li className="submenu-item">
                    <Link
                      to="/product/create"
                      className={`submenu-link ${
                        pathname === "/product/create" && "active"
                      }`}
                    >
                      Create Product
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link
                      to="/product/list"
                      className={`submenu-link ${
                        pathname === "/product/list" && "active"
                      }`}
                    >
                      Product List
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item has-submenu">
              <div
                onClick={() => (show === 4 ? setShow(null) : setShow(4))}
                className={`nav-link submenu-toggle ${
                  pathname.includes("user") && "active"
                }`}
                data-bs-toggle="collapse"
                data-bs-target="#submenu-5"
                aria-expanded={show === 3 ? true : false}
                aria-controls="submenu-5"
              >
                <span className="nav-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-lines-fill"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                  </svg>
                </span>
                <span className="nav-link-text">User</span>
                <span className="submenu-arrow">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-chevron-down"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </div>
              <div
                id="submenu-5"
                className={`collapse submenu submenu-5 ${show === 4 && "show"}`}
                data-bs-parent="#menu-accordion"
              >
                <ul className="submenu-list list-unstyled">
                  <li className="submenu-item">
                    <Link
                      to="/user/createAdmin"
                      className={`submenu-link ${
                        pathname === "/user/createAdmin" && "active"
                      }`}
                    >
                      Add Admin
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link
                      to="/user/adminList"
                      className={`submenu-link ${
                        pathname === "/user/adminList" && "active"
                      }`}
                    >
                      Admin List
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link
                      to="/user/customerList"
                      className={`submenu-link ${
                        pathname === "/user/customerList" && "active"
                      }`}
                    >
                      Customer List
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default Sidebar;
