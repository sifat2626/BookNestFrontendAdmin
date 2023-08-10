import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // author create
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setLoading(false);
      if (data?.error) {
        toast.error(data.error);
      } else if (data.user.role === 0) {
        toast.error("You are not admin");
        return;
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Login successful");
        setEmail("");
        setPassword("");
        const intendedRoute = localStorage.getItem("intendedRoute") || "/";
        navigate(intendedRoute);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Login failed,try again");
      console.log("error", error.message);
    }
  };
  return (
    <Fragment>
      <div className="container-xl mt-2">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Login/</span> Login Admin
        </h4>
        <div className="row gy-4">
          <div className="col-xxl">
            <div className="card mb-4">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Log in</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
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
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder
                      />
                    </div>
                  </div>

                  <div className="row justify-content-end">
                    <div className="col-sm-10">
                      <button
                        type="submit"
                        className="btn app-btn-primary theme-btn"
                        disabled={loading}
                      >
                        {loading ? "Trying to log in.." : "Login"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
