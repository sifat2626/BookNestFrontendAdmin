import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
const CreateAuthor = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [biography, setBiography] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const preset_key = "bookshop";
  const cloud_name = "djftsbsuu";
  const navigate = useNavigate();
  const location = useLocation();
  const imgRef = useRef();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  // console.log('id',id);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axios.get(`/writers/${id}`);
        setName(res.data.name);
        setPhoto(res.data.photo);
        setBiography(res.data.biography);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    if (id) {
      fetchAuthor();
    } else {
      setName("");
      setPhoto("");
      setBiography("");
    }
  }, [id]);

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
      if (id) {
        setLoading(true);
        const res = await axios.put(`/writers/${id}`, {
          name,
          photo,
          biography,
        });
        setLoading(false);
        toast.success("Successfully updated!");
        setName("");
        setPhoto("");
        setBiography("");
        navigate("/author/list");
      } else {
        setLoading(true);
        const res = await axios.post("/writers", {
          name,
          biography,
          photo,
        });
        setLoading(false);
        toast.success("Successfully created!");
        setName("");
        setPhoto("");
        setBiography("");
        navigate("/author/list");
      }
    } catch (error) {
      setLoading(false);
      if(err.message==="error Cannot read properties of undefined (reading 'src')"){
        console.log("avoid this error")
      }
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
            <span className="text-muted fw-light">Author/</span>{" "}
            {id ? "Update" : "Create"}
          </h4>
          {id != null && photo !== "" ? (
            <div className="row justify-content-between align-items-center">
              <div className="col-auto">
                <div className="item-label mb-2">
                  <strong>Photo</strong>
                </div>
                <div className="item-data text-center mb-3">
                  <img
                    ref={imgRef}
                    className="profile-image"
                    src={photo}
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            " "
          )}
          <div className="row gy-4">
            <div className="col-xxl">
              <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="mb-0">
                    {id ? "Update Author" : "Create Author"}
                  </h5>
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
                          value={name}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Biography
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => setBiography(e.target.value)}
                          type="text"
                          className="form-control"
                          value={biography}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Image</label>
                      <div className="col-sm-10">
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleImageChange}
                          placeholder="John Doe"
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
                          {imgUploading
                            ? "Uploading..."
                            : id
                            ? "Update"
                            : "Create"}
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

export default CreateAuthor;
