import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const CreateAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const preset_key = "bookshop";
  const cloud_name = "djftsbsuu";
  const navigate = useNavigate();

  // const imgRef = useRef();

   //  image upload
   const handleImageChange = async (e) => {
    const files = e.target.files;
    try {
      setImgUploading(true);
      const res = await axios.post(
        "/cloudinaryimage",
        { image: files[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPhoto(res.data.image);
      toast.success("Image uploaded successfully");
      imgRef.current.src = res.data.image;
      setImgUploading(false);
    } catch (error) {
      setImgUploading(false);
      if(error.message=="imgRef is not defined"){
        console.log('avoid it');
        return
      }
      // toast.error("error in creating author");
      console.log("error", error.message);
    }
  };

  // author create
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/register", {
        name,
        email,
        password,
        photo,
        phone:"+880",
        address:"BookNest Office",
        role: 1,
      });
      setLoading(false);
      if (res.data.user) {
        toast.success("Successfully created!");
        setName("");
        setPhoto("");
        setPassword("");
        setEmail("");
        setPhone("");
        setAddress("");
        navigate("/user/adminList");
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      setLoading(false);
      toast.error("error in creating author");
      console.log("error", error.message);
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-xl mt-2">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">User/</span> Create Admin
          </h4>
          <div className="row gy-4">
            <div className="col-xxl">
              <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="mb-0">Add Admin</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Name</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Email</label>
                      <div className="col-sm-10">
                        <input
                          type="email"
                          className="form-control"
                          placeholder
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Password
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          placeholder
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Image</label>
                      <div className="col-sm-10">
                        <input
                          type="file"
                          className="form-control"
                          placeholder="select image"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-end">
                      <div className="col-sm-10">
                        <button
                          type="submit"
                          className="btn app-btn-primary theme-btn"
                          disabled={imgUploading}
                        >
                          {imgUploading ? "Uploading..." : "Create"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CreateAdmin;
