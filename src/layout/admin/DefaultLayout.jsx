import React, { Fragment, useEffect, useRef, useState } from "react";
import "../../assets/admin/css/portal.css";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";
import { Outlet,useLocation } from "react-router-dom";
// import {useSearch} from "../../context/search.jsx";

const DefaultLayout = () => {
  const [show, setShow] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // whent the route changes, we want to empty the search value
  // const [searchValue, setSearchValue] = useSearch();
  // const location = useLocation();
  // useEffect(() => {
  //   setSearchValue("");

  //  }, [location.pathname]);
  let sidePanel = useRef();


  const responsiveSidePanel = () => {
    let w = window.innerWidth;
    if (w >= 1200) {
      sidePanel.classList.remove("sidepanel-hidden");
      sidePanel.classList.add("sidepanel-visible");
    } else {
      sidePanel.classList.remove("sidepanel-visible");
      sidePanel.classList.add("sidepanel-hidden");
    }
  };

  const sidebarClickHandler = () => {
    if (sidePanel.classList.contains("sidepanel-visible")) {
      sidePanel.classList.remove("sidepanel-visible");
      sidePanel.classList.add("sidepanel-hidden");
    } else {
      sidePanel.classList.remove("sidepanel-hidden");
      sidePanel.classList.add("sidepanel-visible");
    }
  };

  useEffect(() => {
    responsiveSidePanel();
    window.addEventListener("resize", responsiveSidePanel);
    if (sidebarOpen) sidebarClickHandler();
  }, [sidebarOpen]);

  return (
    <Fragment >
    <div className="app">
      <div className="app-header fixed-top">
        <header className="app-header-inner">
          <Header setSidebarOpen={setSidebarOpen} />
        </header>
        <aside
          ref={(i) => (sidePanel = i)}
          id="app-sidepanel"
          className="app-sidepanel"
        >
          <Sidebar
            show={show}
            setShow={setShow}
            setSidebarOpen={setSidebarOpen}
          />
        </aside>
      </div>
      <main className="app-wrapper">
        <div className="app-content pt-5 p-md-4 p-lg-5">
          <Outlet />
        </div>
      </main>
      </div>
    </Fragment>
  );
};

export default DefaultLayout;
