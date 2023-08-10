import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { useSearch } from "../../context/search.jsx";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useSearch();
  const navigate = useNavigate();
  //  pagination starts
  const [activePageNo, setActivePageNo] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  // const [searchKeyWord, setSearchKeyWord] = useState("0");
  const totalPages = Math.ceil(totalItems / perPage);
  // when the keyword changed then we want to fetch the products with that keyword
  useEffect(() => {
    // if the search value is empty then we want to fetch all the products
    if (searchValue == undefined || searchValue == "" || searchValue == null) {
      fetchProducts();
    }
    // if the search value is not empty then we want to fetch the products with that keyword
    if (searchValue != "") {
      const fetchProductsWithKeyword = async () => {
        try {
          const res = await axios.get(
            `/booklist/${activePageNo}/${perPage}/${searchValue}`
          );
          setProducts(res.data.data[0].Rows);
          setTotalItems(res.data.data[0].Total[0].count);
        } catch (error) {
          console.log("error");
        }
      };
      fetchProductsWithKeyword();
    }
  }, [searchValue, activePageNo]);

  // useEffect(() =>
  // {
  //   fetchProducts();
  // }, [activePageNo]);

  // pagination ends

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/booklist/${activePageNo}/${perPage}/0`);
      setProducts(res.data.data[0].Rows);
      setTotalItems(res.data.data[0].Total[0].count);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  // const getPublications =async(id)=>{
  //   try {
  //     const {data} = await axios.get(
  //       `/publications/${id}`
  //     );
  //     return data.name;
  //   } catch (error) {
  //     console.log("error", error.message);
  //   }
  // }
  useEffect(() => {
    setSearchValue("");
    fetchProducts();
  }, []);

  return (
    <Fragment>
      <div className="container-xl mt-4">
        <div className="row g-3 mb-4 align-items-center justify-content-between">
          <div className="col-auto">
            <h1 className="app-page-title mb-0">Products</h1>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade show active">
              <div className="app-card app-card-orders-table shadow-sm mb-5">
                <div className="app-card-body">
                  <div className="table-responsive">
                    <table className="table app-table-hover mb-0 text-left">
                      <thead className="text-center">
                        <tr>
                          <th className="cell">Title</th>
                          <th className="cell">Author</th>

                          <th className="cell">Photo</th>
                          <th className="cell">Price</th>
                          <th className="cell">Discount</th>
                          <th className="cell">Category</th>
                          <th className="cell">Stock</th>
                          <th className="cell">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {products?.map((product, index) => (
                          <tr key={product._id}>
                            <td className="cell">{product.title}</td>
                            <td className="cell">{product.author[0].name}</td>

                            <td className="cell">
                              <img
                                src={product.photo}
                                alt={product.name}
                                width="40"
                                height="40"
                              />
                            </td>
                            <td className="cell">{product.price}</td>
                            <td className="cell">{product.discount}</td>
                            <td className="cell">{product.category[0].name}</td>
                            <td className="cell">{product.stock}</td>
                            <td className="cell">
                              <a
                                className="btn-sm app-btn-secondary mx-2"
                                onClick={() => {
                                  navigate(
                                    `/product/create/?id=${product._id}`
                                  );
                                }}
                              >
                                Edit
                              </a>
                              <a
                                className="btn-sm app-btn-danger  mx-2"
                                onClick={async () => {
                                  const res = await axios.delete(
                                    `/books/${product._id}`
                                  );
                                  if (res.status === 200) {
                                    toast.success(
                                      "Product Deleted Successfully"
                                    );
                                  }
                                  if (res.status === 400) {
                                    toast.error("Product Deletion Failed");
                                  }
                                  // await fetchProducts();
                                  if (activePageNo == 1) {
                                    await fetchProducts();
                                  } else {
                                    setActivePageNo(1);
                                  }
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

export default ProductList;
