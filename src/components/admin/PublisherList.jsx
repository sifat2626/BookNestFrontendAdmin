import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";
import { useSearch } from "../../context/search.jsx";

const PublisherList = () => {
  const [publishers, setPublishers] = useState([]);
  const [searchValue, setSearchValue] = useSearch();
  useEffect(()=>{
    setSearchValue("");
    
  },[])
  
  
  const navigate = useNavigate();
  const fetchPublishers = async () => {
    try {
      const res = await axios.get("/publications");
      setPublishers(res.data);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  useEffect(() => {
    fetchPublishers();
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
                          <th className="cell">Locatiion</th>
                          <th className="cell">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {publishers?.map((publisher, index) => (
                          <tr key={publisher._id}>
                            <td className="cell">{index + 1}</td>
                            <td className="cell">{publisher.name}</td>
                            <td className="cell">
                              <img
                                src={publisher.photo}
                                alt={publisher.name}
                                width="50"
                                height="50"
                              />
                            </td>
                            <td className="cell">{publisher.location}</td>
                            <td className="cell">
                              <a
                                className="btn-sm app-btn-secondary mx-2"
                                onClick={() => {
                                  navigate(`/publisher/create/?id=${publisher._id}`);
                                }}
                              >
                                Edit
                              </a>
                              <a
                                className="btn-sm app-btn-danger  mx-2"
                                onClick={async () => {
                                  await axios.delete(`/publications/${publisher._id}`)
                                  toast.success(`publication deleted successfully`);
                                  await fetchPublishers();
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

export default PublisherList;
