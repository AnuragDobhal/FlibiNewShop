import { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { commerce } from "./lib/commerce";
// import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";
import Products from "./components/Products";
import Basket from "./components/Basket";
import Checkout from "./components/Checkout";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import NotFoundPage from "./components/Error404/NotFoundPage";


const App = () => {
  const [products, setProducts] = useState([]);
  const [basketData, setBasketData] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState("");

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data) || []);
  };

  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve();
    setBasketData(response);
  };

  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setBasketData(response.cart);
  };

  const RemoveItemFromBasket = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setBasketData(response.cart);
  };

  const handleEmptyBasket = async () => {
    const response = await commerce.cart.empty();
    setBasketData(response.cart);
  };

  const updateProduct = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setBasketData(response.cart);
  };

  const refreshBasket = async () => {
    const newBasketData = await commerce.cart.refresh();
    setBasketData(newBasketData);
  };

  const handleCheckout = async (checkoutId, orderData) => {
    try {
      // const incomingOrder = await commerce.checkout.capture(
      //   checkoutId,
      //   orderData
      // );

      setOrderInfo(orderData);

      refreshBasket();
    } catch (error) {
      setOrderError(
        (error.data && error.data.error && error.data.error.message) ||
          "There is an error occurred"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBasketData();
  }, []);

  return (
    <Router>
      <div>
        <CssBaseline />
     
        <Switch>
          <Route exact path="/">
          <NavBar
          basketItems={basketData.total_items}
          totalCost={
            (basketData.subtotal &&
              basketData.subtotal.formatted_with_symbol) ||
            "00.00"
          }
        />
            <Products products={products} addProduct={addProduct} />
            <Footer/>
          </Route>


          <Route exact path="/basket">

          <NavBar
          basketItems={basketData.total_items}
          totalCost={
            (basketData.subtotal &&
              basketData.subtotal.formatted_with_symbol) ||
            "00.00"
          }
        />
            <Basket
              basketData={basketData}
              updateProduct={updateProduct}
              handleEmptyBasket={handleEmptyBasket}
              RemoveItemFromBasket={RemoveItemFromBasket}
            />
             <Footer/>
          </Route>


          <Route exact path="/checkout">

          <NavBar
          basketItems={basketData.total_items}
          totalCost={
            (basketData.subtotal &&
              basketData.subtotal.formatted_with_symbol) ||
            "00.00"
          }
        />
            <Checkout
              orderInfo={orderInfo}
              orderError={orderError}
              basketData={basketData}
              handleCheckout={handleCheckout}
            />
             <Footer/>
          </Route>
          
          <Route path="*" >
            <NotFoundPage/>
          </Route>

        </Switch>
       
      </div>
    </Router>
  );
};

export default App;
