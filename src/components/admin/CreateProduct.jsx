import React, { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";
const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [authors, setAuthors] = useState([]);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [publication, setPublication] = useState("");
  const [publications, setPublications] = useState([]);
  const [stock, setStock] = useState(0);
  const [imgUploading, setImgUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  // const preset_key = "bookshop";
  // const cloud_name = "djftsbsuu";
  const navigate = useNavigate();
  const location = useLocation();
  const imgRef = useRef();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  // console.log("id", id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/search/book/${id}`);

        setTitle(data.title);
        setAuthor(data.author._id);
        setDescription(data.description);
        setPhoto(data.photo);
        setPrice(data.price);
        setDiscount(data.discount);
        setCategory(data.category._id);
        setPublication(data.publication._id);
        setStock(data.stock);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    if (id) {
      fetchProduct();
    } else {
      setTitle("");
      setAuthor("");
      setDescription("");
      setPhoto("");
      setPrice(0);
      setDiscount(0);
      setCategory("");
      setPublication("");
      setStock(0);
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
      if(error.message=="imgRef is not defined" || error.message=="Cannot set properties of undefined (setting 'src')"){
        console.log('avoid it');
        return
      }
      // toast.error("error in creating author");
      console.log("error", error.message);
    }
  };

  // product create
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        setLoading(true);
        const res = await axios.put(`/books/${id}`, {
          title,
          author,
          description,
          photo,
          price,
          discount,
          category,
          publication,
          stock,
        });
        setLoading(false);
        toast.success("Successfully updated!");
        setTitle("");
        setAuthor("");
        setDescription("");
        setPhoto("");
        setPrice(0);
        setDiscount(0);
        setCategory("");
        setPublication("");
        setStock(0);
        navigate("/product/list");
      } else {
        setLoading(true);
        const res = await axios.post("/books", {
          title,
          author,
          description,
          photo,
          price,
          discount,
          category,
          publication,
          stock,
        });
        console.log('res',res);
        
        setLoading(false);
        toast.success("Successfully created!");
        setTitle("");
        setAuthor("");
        setDescription("");
        setPhoto("");
        setPrice(0);
        setDiscount(0);
        setCategory("");
        setPublication("");
        setStock(0);
        navigate("/product/list");
      }
    } catch (error) {
      setLoading(false);
      toast.error("error in creating book");
      console.log("error", error.message);
    }
  };

  const fetchAuthors = async () => {
    try {
      const res = await axios.get("/writers");
      setAuthors(res.data);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  const fetchPublications = async () => {
    try {
      const res = await axios.get("/publications");
      setPublications(res.data);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  useEffect(() => {
    fetchAuthors();
    fetchCategories();
    fetchPublications();
    console.log('categories',categories);
    console.log('authors',authors);
    
  }, []);
  
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-xl mt-2">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Book/</span>{" "}
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
                  <h5 className="mb-0">{id ? "Update Book" : "Create Book"}</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Title</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Category
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          onChange={(e) => setCategory(e.target.value)}
                          aria-label="Default select example"
                          value={category}
                        >
                          <option>
                            Select Category
                          </option>

                          {categories?.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Author</label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          onChange={(e) => setAuthor(e.target.value)}
                          aria-label="Default select example"
                          value={author}
                        >
                          <option>
                            Select Author
                          </option>
                          {authors?.map((author) => (
                            <option key={author._id} value={author._id}>
                              {author.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Publication
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          onChange={(e) => setPublication(e.target.value)}
                          aria-label="Default select example"
                          value={publication}
                        >
                          <option >
                            Select Publication
                          </option>
                          {publications?.map((publication) => (
                            <option
                              key={publication._id}
                              value={publication._id}
                            >
                              {publication.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Description
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                          className="form-control"
                          rows={5}
                          value={description}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Price</label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => setPrice(e.target.value)}
                          value={price}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Discount
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => setDiscount(e.target.value)}
                          value={discount}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Stock</label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => setStock(e.target.value)}
                          value={stock}
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

export default CreateProduct;
