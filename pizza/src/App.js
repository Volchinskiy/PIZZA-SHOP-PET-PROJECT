import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux"


import { Header } from "./components";
import { Home, Cart } from "./pages";
import { Route, Routes } from "react-router-dom";
import { setPizzas } from "./redux/actions/pizzas";

// http://localhost:3000/pizzas?_order=asc&_sort=price
// http://localhost:3000/pizzas?_order=desc&_sort=price

function App(){
  
  React.useEffect( () => {
    axios.get('http://localhost:3001/pizzas?_order=desc&_sort=price').then(({ data }) => {
      dispatch(setPizzas(data));
    });
  }, []);
  
  const dispatch = useDispatch();

  return(
  <div className="App">
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} exact/>
          <Route path="/cart" element={<Cart />} exact />
        </Routes>
      </div>
    </div>
</div>)
}

export default App;