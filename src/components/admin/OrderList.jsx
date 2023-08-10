import axios from "axios";
import moment  from "moment"
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { useSearch } from "../../context/search.jsx";
const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchValue, setSearchValue] = useSearch();
  const [status, setStatus] = useState("0");
  const navigate = useNavigate();
  //  pagination starts
  const [activePageNo, setActivePageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  // const [searchKeyWord, setSearchKeyWord] = useState("0");
  const totalPages = Math.ceil(totalItems / perPage);
  // when the keyword changed then we want to fetch the products with that keyword
  useEffect(() => {
    // if the search value is empty then we want to fetch all the products
    if (searchValue == undefined || searchValue == "" || searchValue == null) {
      fetchOrders();
    }
    // if the search value is not empty then we want to fetch the products with that keyword
    if (searchValue != "") {
      const fetchOrdersWithId = async () => {
        try {
          const res = await axios.get(
            `/getordersbystatus/0/${activePageNo}/${perPage}/${searchValue}`
          );
          if(res.data.message=="Error occurred while retrieving orders."){
            toast.error("No data found with this id..");
          }
          setOrders(res.data.data);
          setTotalItems(res.data.totalCount);
        } catch (error) {
          console.log("error", error.message);
        }
      };
      fetchOrdersWithId();
    }
  }, [searchValue, activePageNo]);

useEffect(() => {
  
  if(status==="0" || status==="" || status===null || status===undefined){
    fetchOrders();
  }

  if(status!=="0" && status!=="" && status!==null && status!==undefined){
    const fetchOrdersWithStatus = async () => {
      try {
        const res = await axios.get(
          `/getordersbystatus/${status}/${activePageNo}/${perPage}/0`
        );
        setOrders(res.data.data);
        setTotalItems(res.data.totalCount);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchOrdersWithStatus();
  }
}, [status, activePageNo])


  // pagination ends

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`/getordersbystatus/${status}/${activePageNo}/${perPage}/0`);
      setOrders(res.data.data);
      setTotalItems(res.data.totalCount);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    setSearchValue("");
    fetchOrders();
  }, []);

  console.log('orders', orders);
  console.log('searchValue', searchValue);
  
  const handleOrderChange = async (event, orderId) => {
    const status = event.target.value;
    try {
      const res = await axios.put(`/orders/${orderId}`, {status});
      console.log('res', res.data);
      
      if(res.status===200) {
        toast.success("Order updated successfully.");
        fetchOrders();
      }
    } catch (error) {
      toast.error("Error updating order.");
      console.log('error', error.message);
      
    }
  }
    
    
  return (
    <Fragment>
      <div className="container-xl mt-4">
        <div className="row g-3 mb-4 align-items-center justify-content-between">
          <div className="col-auto">
            <h1 className="app-page-title mb-0">Orders list: </h1>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade show active">
              <div className="app-card app-card-orders-table shadow-sm mb-5">
                <div className="app-card-body">
                  <div className="table-responsive">
                    <table className="table app-table-hover mb-0 text-left">
                      <thead className="text-center">
                        <tr>
                          <th className="cell">Id</th>
                          <th className="cell">Status</th>
                          <th className="cell">Products</th>
                          <th className="cell">Total</th>
                          <th className="cell">User</th>
                          <th className="cell">Date</th>
                          <th className="cell">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {orders?.map((order) => (
                          <tr key={order._id}>
                            <td class="cell">{order._id}</td>
                            <td class="cell">
                              <span class="truncate">{order.status}</span>
                            </td>
                            <td class="cell">
                              {order.items.map((item, i) => {
                                return (
                                  <p>
                                    <span className="mr-3">{i + 1})</span>{" "}
                                    <span>
                                      {item.book.title} * {item.quantity}
                                    </span>
                                  </p>
                                );
                              })}
                            </td>
                            <td class="cell">
                              <span class="cell-data">
                                {order.items.reduce((total, item) => {
                                  const price = item.book.price;
                                  const quantity = item.quantity;

                                  // Multiply price by quantity and add to the total
                                  return total + price * quantity;
                                }, 0)}
                              </span>
                              <span class="note">Taka</span>
                            </td>
                            <td class="cell">
                              <span class="badge bg-primary">
                                {order.user.email}
                              </span>
                            </td>
                            <td class="cell">
                              {moment(order?.createdAt).fromNow()}
                            </td>
                            <td class="cell">
                              <select className="form-select w-auto" value={order?.status} 
                              onChange={(event) =>handleOrderChange(event, order._id)}
                              >
                                <option selected value="">Change status</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Pending">Pending</option>
                              </select>
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

export default OrderList;
