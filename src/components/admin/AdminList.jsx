import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Pagination from "./Pagination";
import { useSearch } from "../../context/search.jsx";
const AdminList = () => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useSearch();
  //  pagination starts
  const [activePageNo, setActivePageNo] = useState(1);
  const [perPage, setPerPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / perPage);

  // search user by name
  useEffect(() => {
    if (searchValue == undefined || searchValue == "" || searchValue == null) {
      fetchUsers();
    }

    if (searchValue != "") {
      const fetchUsersWithKeyword = async () => {
        try {
          const res = await axios.get(
            `/alladmin/${activePageNo}/${perPage}/${searchValue}`
          );
          setUsers(res.data.data[0].Rows);
          setTotalItems(res.data.data[0].Total[0].count);
        } catch (error) {
          console.log("error");
        }
      };
      fetchUsersWithKeyword();
    }
  }, [searchValue, activePageNo]);

  // useEffect(() =>
  // {
  //   fetchUsers();
  // }, [activePageNo]);

  // pagination ends

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`/alladmin/${activePageNo}/${perPage}/0`);
      setUsers(res.data.data[0].Rows);
      setTotalItems(res.data.data[0].Total[0].count);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    setSearchValue("");
    fetchUsers();
  }, []);

  return (
    <Fragment>
      <div className="container-xl mt-4">
        <div className="row g-3 mb-4 align-items-center justify-content-between">
          <div className="col-auto">
            <h1 className="app-page-title mb-0">Admins</h1>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade show active">
              <div className="app-card app-card-orders-table shadow-sm mb-5">
                <div className="app-card-body">
                  <div className="table-responsive">
                    <table className="table app-table-hover mb-0 text-left">
                      <thead className="text-center">
                        <tr>
                          <th className="cell">Name</th>
                          <th className="cell">Email</th>

                          <th className="cell">Photo</th>
                          <th className="cell">Address</th>
                          <th className="cell">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {users?.map((user, index) => (
                          <tr key={user._id}>
                            <td className="cell">{user.name}</td>
                            <td className="cell">{user.email}</td>

                            <td className="cell">
                              <img
                                src={user.photo}
                                alt={user.name}
                                width="40"
                                height="40"
                              />
                            </td>
                            <td className="cell">
                              {user.address ? user.address : "no address found"}
                            </td>
                            <td className="cell">
                              <a
                                className="btn-sm app-btn-danger  mx-2"
                                onClick={async () => {
                                  const { data } = await axios.put(
                                    "/adminstatus/" + user._id
                                  );
                                  if (data.status === "success") {
                                    toast.success(
                                      `${user.name} is demoted to normal user`
                                    );
                                  }
                                  if (activePageNo == 1) {
                                    await fetchUsers();
                                  } else {
                                    setActivePageNo(1);
                                  }
                                }}
                              >
                                Make User
                              </a>
                              <a
                                className="btn-sm app-btn-danger  mx-2"
                                onClick={async () => {
                                  const { data } = await axios.delete(
                                    `/user/${user._id}`
                                  );
                                  if (data.success) {
                                    toast.success("User deleted successfully");
                                  } else {
                                    toast.error("Something went wrong");
                                  }

                                  setActivePageNo(1);
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
      {/*
        pagination
      */}
      <Pagination setActivePageNo={setActivePageNo} totalPages={totalPages} />
    </Fragment>
  );
};

export default AdminList;
