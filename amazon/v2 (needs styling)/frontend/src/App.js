import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./components/SearchBox";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";

import SearchScreen from "./screens/SearchScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductListScreen from "./screens/ProductListScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import SellerScreen from "./screens/SellerScreen";
import { signout } from "./actions/userActions";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import MapScreen from "./screens/MapScreen";
import PrivateRoute from "./components/PrivateRoute";
import SellerRoute from "./components/SellerRoute";
import AdminRoute from "./components/AdminRoute";
import DashboardScreen from "./screens/DashboardScreen";
import ChatBox from "./components/ChatBox";
import SupportScreen from "./screens/SupportScreen";

function App() {
  const dispatch = useDispatch();

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { categories, loading, error } = productCategoryList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const handleSignout = () => {
    dispatch(signout());
  };
  useEffect(() => {
    dispatch(listProductCategories());
    return () => {
      //
    };
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              className="open-sidebar"
              type="button"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars" />
            </button>
            <Link className="brand" to="/">
              amazon
            </Link>
          </div>
          <div>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#admin">
                  {userInfo.name}{" "}
                  <i
                    className="fa fa-caret-down	
"
                  />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory"> Order History </Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={handleSignout}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin"> Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#seller">
                  Seller{" "}
                  <i
                    className="fa fa-caret-down	
"
                  />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orderlist/seller"> Orders</Link>
                  </li>
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#seller">
                  Admin{" "}
                  <i
                    className="fa fa-caret-down	
"
                  />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard"> Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/orderlist"> Orders</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Shopping Categories</strong>
              <button
                type="button"
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
              >
                x
              </button>
            </li>
            {loading ? (
              <li>
                <LoadingBox />
              </li>
            ) : error ? (
              <li>
                <MessageBox variant="error">{error}</MessageBox>
              </li>
            ) : categories.length === 0 ? (
              <li>There is no categories.</li>
            ) : (
              categories.map((x) => (
                <li key={x}>
                  <Link
                    onClick={() => setSidebarIsOpen(false)}
                    to={`/search/category/${x}`}
                  >
                    {x}
                  </Link>

                  <span>
                    <i className="fa fa-arrow-right" />
                  </span>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          {/* Customer  */}
          <PrivateRoute path="/placeorder" component={PlaceOrderScreen} />
          <PrivateRoute path="/payment" component={PaymentMethodScreen} />
          <PrivateRoute path="/shipping" component={ShippingAddressScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <PrivateRoute path="/orderhistory" component={OrderHistoryScreen} />
          <PrivateRoute path="/order/:id" component={OrderScreen} />
          <PrivateRoute path="/map" component={MapScreen} exact />

          {/* Seller  */}
          <SellerRoute path="/orderlist/seller" component={OrderListScreen} />
          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          />
          <SellerRoute path="/product/:id/edit" component={ProductEditScreen} />
          <SellerRoute path="/user/:id/edit" component={UserEditScreen} />

          {/* Admin  */}
          <AdminRoute path="/support" component={SupportScreen} />
          <AdminRoute path="/dashboard" component={DashboardScreen} />
          <AdminRoute path="/userlist" component={UserListScreen} />
          <AdminRoute path="/orderlist" component={OrderListScreen} exact />
          <AdminRoute path="/productlist" component={ProductListScreen} exact />

          {/* Public  */}
          <Route
            path="/search/category/:category/keyword/:keyword/order/:order/min/:min/max/:max/rate/:rate"
            component={SearchScreen}
          />
          <Route
            path="/search/keyword/:keyword?"
            component={SearchScreen}
            exact
          />
          <Route
            path="/search/category/:category?"
            component={SearchScreen}
            exact
          />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/seller/:id" component={SellerScreen} />
          <Route path="/search" component={SearchScreen} exact />
          <Route path="/" exact component={HomeScreen} />
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}

          <div>© 2020 All right reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
