import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TruncatedText from "../utils/TruncatedText";
import Pagination from "./Pagination";

const CategoryList = () => {
  const [authors, setAuthors] = useState([]);

  const navigate = useNavigate();
  const fetchAuthors = async () => {
    try {
      const res = await axios.get("/writers");
      setAuthors((prevAutor)=>res.data);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  const deleteAuthor =async (id) => {
    await axios.delete(`/writers/${id}`);
    await fetchAuthors();
    toast.success(`writer deleted successfully`);
    // window.location.reload();
  };
  useEffect(() => {
    fetchAuthors();
  }, []);
  return (
    <Fragment>
      <div className="container-xl mt-4">
        <div className="row g-3 mb-4 align-items-center justify-content-between">
          <div className="col-auto">
            <h1 className="app-page-title mb-0">Authors</h1>
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
                          <th className="cell">Biography</th>
                          <th className="cell">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {authors?.map((author, index) => (
                          <tr key={author._id}>
                            <td className="cell">{index + 1}</td>
                            <td className="cell">{author.name}</td>
                            <td className="cell">
                              <img
                                src={author.photo}
                                alt={author.name}
                                width="50"
                                height="50"
                              />
                            </td>
                            <td className="cell">
                              <TruncatedText
                                text={author.biography}
                                maxWords={10}
                              />
                            </td>
                            <td className="cell">
                              <a
                                className="btn-sm app-btn-secondary mx-2"
                                onClick={() => {
                                  navigate(`/author/create/?id=${author._id}`);
                                }}
                              >
                                Edit
                              </a>
                              <a
                                className="btn-sm app-btn-danger  mx-2"
                                onClick={deleteAuthor.bind(this, author._id)}
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
