import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './css/frontpage_style.css';
import FarmCarousel from './FarmCarousel';
import ProductPage from './ProductPage';
import UserProfile from './UserProfile';
import AddProduct from './AddProduct';
import AddUser from './AddUser'
import Login from './Login';
import SearchProducts from './SearchProducts';
import NavigationBar from './NavigationBar';
import OrdersPage from "./OrdersPage";
import ErrorPage from "./ErrorPage";

function Index() {
  return <FarmCarousel />;
}

function Products() {
  return <ProductPage/>;
}

function ShoppingCart() {
  return <h1>Ostoskori</h1>;
}

function Wrapper() {
  if (localStorage.getItem('loggedin') === null) {
    localStorage.setItem('loggedin', 'false');
  }
  return (
    <Router>
      <div>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/tuotteet/" component={Products} />
          <Route exact path="/ostoskori/" component={ShoppingCart} />
          <Route exact path="/profiili/:id" component={UserProfile} />
          <Route exact path="/tuotelisays/:id" component={AddProduct} />
          <Route exact path="/profiili/oma/:gid" component={AddUser} />
          <Route exact path="/login/" component={Login} />
          <Route exact path="/etsi/:keyWord" component={SearchProducts} />
          <Route exact path="/tag/:tag" component={SearchProducts} />
          <Route exact path="/tilaukset/" component={OrdersPage} />
          <Route component={ErrorPage} />
        </Switch>
        <div className="footer"><span className="spanFooter">Lähiruoka 2019. Sivu käyttää evästeitä käytön jouhevoittamiseksi. Käyttämällä sivua hyväksyt myös evästeet.</span></div>
      </div>
    </Router>
  );
}

export default Wrapper;
