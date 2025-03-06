import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { checkUserSession } from "./redux/User/user.actions";

// components
import AdminToolbar from "./components/AdminToolbar";

//hoc
import WithAdminAuth from "./hoc/withAdminAuth";
import WithAuth from "./hoc/withAuth";

// layouts
import AdminLayout from "./layouts/AdminLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import MainLayout from "./layouts/MainLayout";

// pages
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import CompleteSignUp from "./pages/CompleteSignUp/index.js";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Order from "./pages/Order/index.js";
import Payment from "./pages/Payment";
import ProductDetails from "./pages/ProductDetails";
import Recovery from "./pages/Recovery";
import Search from "./pages/Search.js";
import Signup from "./pages/Signup";
import Wishlists from "./pages/Wishlist/index.js";

// global styles
import "./default.scss";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        />
        <Route
          path="/search/:filterType"
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        />
        <Route
          path="/product/:productID"
          render={() => (
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          )}
        />
        <Route
          path="/wishlists"
          render={() => (
            <MainLayout>
              <Wishlists />
            </MainLayout>
          )}
        />
        <Route
          path="/cart"
          render={() => (
            <MainLayout>
              <Cart />
            </MainLayout>
          )}
        />
        <Route
          path="/payment"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Payment />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/signup"
          render={() => (
            <MainLayout>
              <Signup />
            </MainLayout>
                    <Route
                    path="/profile-setup"
                    render={() => {
                      <WithAuth>
                        <MainLayout>
                          <CompleteSignUp />
                        </MainLayout>
                      </WithAuth>;
                    }}
                  />
          )}
        />
        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
              <Route
                path="/wishlist"
                render={() => (
                  <AdminLayout>
                    <Wishlists />
                  </AdminLayout>
                )}
              />
            </WithAuth>
          )}
        />
        <Route
          path="/order/:orderID"
          render={() => (
            <WithAuth>
              <DashboardLayout>
                <Order />
              </DashboardLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/order/:orderID"
          render={() => (
            <WithAuth>
              <DashboardLayout>
                <Order />
              </DashboardLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
              <Route
                path="/wishlist"
                render={() => (
                  <AdminLayout>
                    <Wishlists />
                  </AdminLayout>
                )}
              />
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
