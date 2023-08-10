import { Fragment, Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import "./App.css";
import Loader from "./components/loader/Loader";
import DefaultLayout from "./layout/admin/DefaultLayout";
const OrderList = lazy(() => import("./components/admin/OrderList"));
const CreateAdmin = lazy(() => import("./components/admin/CreateAdmin"));
const CreateProduct = lazy(() => import("./components/admin/CreateProduct"));
const CreatePublisher = lazy(() =>
  import("./components/admin/CreatePublisher")
);
const CreateAuthor = lazy(() => import("./components/admin/CreateAuthor"));
const CreateCategory = lazy(() => import("./components/admin/CreateCategory"));
const Dashboard = lazy(() => import("./components/admin/Dashboard"));
const CategoryList = lazy(() => import("./components/admin/CategoryList"));
const AuthorList = lazy(() => import("./components/admin/AuthorList"));
const PublisherList = lazy(() => import("./components/admin/PublisherList"));
const ProductList = lazy(() => import("./components/admin/ProductList"));
const UserList = lazy(() => import("./components/admin/UserList"));
const AdminList = lazy(() => import("./components/admin/AdminList"));
const Login = lazy(() => import("./components/admin/Login"));

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <AdminRoute path="/"  >
                   <Dashboard />
                 </AdminRoute  >
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loader />}>
                
                  <Login />
                
                </Suspense>
              }
            />
            <Route
              path="/category/create"
              element={
                <Suspense fallback={<Loader />}>
                <AdminRoute path="/category/create"  >
                  <CreateCategory />
                </AdminRoute  >
                </Suspense>
              }
            />
            
            <Route
              path="/category/list"
              element={
                <Suspense fallback={<Loader />}>
                <AdminRoute path="/category/list"  >
                  <CategoryList />
                </AdminRoute  >
                </Suspense>
              }
            />

            <Route
              path="/author/create"
              element={
                <Suspense fallback={<Loader />}>
                <AdminRoute path="/author/create"  >
                  <CreateAuthor />
                </AdminRoute  >
                </Suspense>
              }
            />
            <Route
              path="/author/list"
              element={
                <Suspense fallback={<Loader />}>
                <AdminRoute path="/author/list"  >
                  <AuthorList />
                </AdminRoute  >
                </Suspense>
              }
            />
            <Route
              path="/publisher/create"
              element={
                <Suspense fallback={<Loader />}>
                <AdminRoute path="/publisher/create"  >
                  <CreatePublisher />
                </AdminRoute  >
                </Suspense>
              }
            />
            <Route
              path="/publisher/list"
              element={
                <Suspense fallback={<Loader />}>
                <AdminRoute path="/publisher/list"  >
                  <PublisherList />
                </AdminRoute  >
                </Suspense>
              }
            />
            <Route
              path="/product/create"
              element={
                <Suspense fallback={<Loader />}>
                <AdminRoute path="/product/create"  >
                  <CreateProduct />
                </AdminRoute  >
                </Suspense>
              }
            />
            <Route
              path="/product/list"
              element={
                <Suspense fallback={<Loader />}>
                <AdminRoute path="/product/list"  >
                  <ProductList />
                </AdminRoute  >
                </Suspense>
              }
            />
            <Route
              path="/order/list"
              element={
                <Suspense fallback={<Loader />}>
                  <AdminRoute path="/order/list"  >
                  <OrderList />
                  </AdminRoute  >
                </Suspense>
              }
            />
            <Route
              path="/user/createAdmin"
              element={
                <Suspense fallback={<Loader />}>
                <AdminRoute path="/user/createAdmin"  >
                  <CreateAdmin />
                </AdminRoute  >
                </Suspense>
              }
            />
            <Route
              path="/user/adminList"
              element={
                <Suspense fallback={<Loader />}>
                <AdminRoute path="/user/adminList"  >
                  <AdminList />
                </AdminRoute  >
                </Suspense>
              }
            />
            <Route
              path="/user/customerList"
              element={
                <Suspense fallback={<Loader />}>
                <AdminRoute path="/user/customerList"  >
                  <UserList />
                </AdminRoute  >
                </Suspense>
              }
            />
          </Route>
        </Routes>
        <DefaultLayout />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

export function AdminRoute({ children, path }) {
 if (localStorage.getItem("auth")) {
   return children;
 } else {
  localStorage.setItem("intendedRoute", path);
   return <Navigate to="/login" />;
  
 }
}
