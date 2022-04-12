import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import AboutScreen from './screens/AboutScreen';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import SearchListScreen from './screens/SearchListScreen';
import ContactedScreen from './screens/ContactedScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import GisTrainingScreen from './screens/GisTrainingScreen';
import GiScreen from './screens/GisScreen';
import LearnSpssScreen from './screens/LearnSpssScreen';
import RlearnScreen from './screens/RlearnScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import MapScreen from './screens/MapScreen';
import MyMapScreen from './screens/MyMapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';
import SoilScreen from './screens/SoilScreen';
import VegetationScreen from './screens/VegetationScreen';
import ThematicScreen from './screens/ThematicScreen';
import AdministrativeScreen from './screens/AdministrativeScreen';
import GeologyScreen from './screens/GeologyScreen';
import TopographyScreen from './screens/TopographyScreen';
import CustomStudyareaScreen from './screens/CustomStudyareaScreen';
import LulcScreen from './screens/LulcScreen';
import RlearnRoute from './components/RlearnRoute';
import RregisterScreen from './screens/RregisterScreen';
import GisRegisterScreen from './screens/GisRegisterScreen';
import GisLearnRoute from './components/GisLearnRoute';
import ContactScreen from './screens/ContactScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Map Store
            </Link>
          </div>
          <div>
            <Link to="/" className="btn btn-danger">
              <i className="fa fa-home"></i>
            </Link>
            <Link to="/cart">
              <i className="fa fa-download"></i>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/contact">
              <i className="fa fa-address-card" aria-hidden="true"></i>
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  <i className='fa fa-user'></i> <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && (
              <div className="dropdown">
                <Link to="#admin">
                  Learn <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/gistraining"> Basic GIS </Link>
                  </li>

                  <li>
                    <Link to="/gis">Advance GIS </Link>
                  </li>
                  <li>
                    <Link to="/rlearn">R Studio</Link>
                  </li>
                  <li>
                    <Link to="/learnspss">SPSS</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/searchlist">SearchList</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                  <li>
                    <Link to="/contacted">Contacts</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/seller/:id" element={<SellerScreen />}></Route>
            <Route path="/about" element={<AboutScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/cart/:id" element={<CartScreen />}></Route>
            <Route path="/contact" element={<ContactScreen />}></Route>
            <Route path="/gisregister" element={<PrivateRoute><GisRegisterScreen /></PrivateRoute>}></Route>
            <Route path='/rregister' element={<PrivateRoute><RregisterScreen /></PrivateRoute>}></Route>
            <Route
              path="/product/:id"
              element={<ProductScreen />}
              exact
            ></Route>
            <Route
              path="/product/:id/edit"
              element={<ProductEditScreen />}
              exact
            ></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/topography" element={<TopographyScreen />}></Route>
            <Route path="/studyarea" element={<CustomStudyareaScreen />}></Route>
            <Route path="/geology" element={<GeologyScreen />}></Route>
            <Route path="/soil" element={<SoilScreen />}></Route>
            <Route path="/vegetation" element={<VegetationScreen />}></Route>
            <Route path="/thematic" element={<ThematicScreen />}></Route>
            <Route path="/lulc" element={<LulcScreen />}></Route>
            <Route path="/administrative" element={<AdministrativeScreen />}></Route>
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route path="/mymap" element={<MyMapScreen />}></Route>
            <Route path="/searchlist" element={<SearchListScreen />}></Route>
            <Route path="/contacted" element={<ContactedScreen />}></Route>
            <Route path="/gistraining" element={<GisTrainingScreen />}></Route>
            <Route
              path="/orderhistory"
              element={<OrderHistoryScreen />}
            ></Route>
            <Route path="/search/name" element={<SearchScreen />} exact></Route>
            <Route
              path="/search/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              element={<SearchScreen />}
              exact
            ></Route>

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />
            <Route path="/gis" element={<GisLearnRoute><GiScreen /></GisLearnRoute>}></Route>
            <Route
              path="/rlearn"
              element={
                <RlearnRoute>
                  <RlearnScreen />
                </RlearnRoute>}
            />
            <Route path="/learnspss" element={<PrivateRoute><LearnSpssScreen /></PrivateRoute>}></Route>
            <Route
              path="/map"
              element={
                <PrivateRoute>
                  <MapScreen />
                </PrivateRoute>
              }
            />

            <Route
              path="/productlist"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/productlist/pageNumber/:pageNumber"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/orderlist"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/userlist"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/user/:id/edit"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/support"
              element={
                <AdminRoute>
                  <SupportScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/productlist/seller"
              element={
                <SellerRoute>
                  <ProductListScreen />
                </SellerRoute>
              }
            />
            <Route
              path="/orderlist/seller"
              element={
                <SellerRoute>
                  <OrderListScreen />
                </SellerRoute>
              }
            />

            <Route path="/" element={<HomeScreen />} exact></Route>
          </Routes>
          <div className="icon-bar">
            <a href="https://www.facebook.com/gismapsservices/" className="facebook"><i className="fa fa-facebook"></i></a>
            <a href="https://www.linkedin.com/company/nigermaps" className="linkedin"><i className="fa fa-linkedin"></i></a>
            <a href="https://studio.youtube.com/channel/UCC-KUIicsxqsIXpixjp9ieg/playlists" className="youtube"><i className="fa fa-youtube"></i></a>
          </div>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>Copyright @Nigermaps 2022</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;