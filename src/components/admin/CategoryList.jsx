import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Fragment>
      <div className="container-xl mt-4">
        <div className="row g-3 mb-4 align-items-center justify-content-between">
          <div className="col-auto">
            <h1 className="app-page-title mb-0">Categories</h1>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade show active">
              <div className="app-card app-card-orders-table shadow-sm mb-5">
                <div className="app-card-body">
                  <div className="table-responsive">
                    <table className="table app-table-hover mb-0 text-left">
                      <thead>
                        <tr>
                          <th className="cell">No.</th>
                          <th className="cell">Name</th>
                          <th className="cell">Photo</th>
                          <th className="cell">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories?.map((category, index) => (
                          <tr key={category._id}>
                            <td className="cell">{index + 1}</td>
                            <td className="cell">{category.name}</td>
                            <td className="cell">
                              <img
                                src={category.photo}
                                alt={category.name}
                                width="50"
                                height="50"
                              />
                            </td>
                            <td className="cell">
                              <a
                                className="btn-sm app-btn-secondary mx-2"
                                onClick={() => {
                                  navigate(
                                    `/category/create/?id=${category._id}`
                                  );
                                }}
                              >
                                Edit
                              </a>
                              <a
                                className="btn-sm app-btn-danger  mx-2"
                                onClick={async () => {
                                  await axios.delete(
                                    `/categories/${category._id}`
                                  );
                                  toast.success(
                                    `Categories deleted successfully`
                                  );
                                  await fetchCategories();
                                }}
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryList;
