import React, { Fragment } from "react";
import loader from "./book-loading.gif";

const Loader = () => {
  return (
    <Fragment>
      <div className="loader-container">
        <img src={loader} alt="loader" />
      </div>
    </Fragment>
  );
};

export default Loader;
