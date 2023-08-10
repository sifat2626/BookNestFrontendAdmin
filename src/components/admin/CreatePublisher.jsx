import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
const CreatePublisher = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [locationData, setLocationData] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const imgRef = useRef();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  // console.log('id',id);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const res = await axios.get(`/publications/${id}`);
        setName(res.data.name);
        setPhoto(res.data.photo);
        setLocationData(res.data.location);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    if (id) {
      fetchPublication();
    } else {
      setName("");
      setPhoto("");
      setLocationData("");
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
      // toast.error("error in creating author");
      console.log("error", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        setLoading(true);
        const res = await axios.put(`/publications/${id}`, {
          name,
          photo,
          location: locationData,
        });
        setLoading(false);
        toast.success("Successfully updated!");
        setName("");
        setPhoto("");
        setLocationData("");
        navigate("/publisher/list");
      } else {
        setLoading(true);
        const res = await axios.post("/publications", {
          name,
          photo,
          location: locationData,
        });
        setLoading(false);
        toast.success("Successfully created!");
        setName("");
        setPhoto("");
        setLocationData("");
        navigate("/publisher/list");
      }
    } catch (error) {
      setLoading(false);
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
            <span className="text-muted fw-light">Publisher/</span>{" "}
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
                    {id ? "Update Publisher" : "Create Publisher"}
                  </h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Location
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          onChange={(e) => setLocationData(e.target.value)}
                          className="form-control"
                          rows={5}
                          value={locationData}
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

export default CreatePublisher;
