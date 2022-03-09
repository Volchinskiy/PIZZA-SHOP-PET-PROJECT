import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { setPizzas } from "./redux/actions/pizzas";
import { connect } from "react-redux"


import { Header } from "./components";
import { Home, Cart } from "./pages";

// function App() {
//   const [pizzas, setPizzas] = React.useState([]) 
 
//   React.useEffect( () => {

    // axios.get('http://localhost:3000/bd.json').then(({ data }) => {
    //   setPizzas(data.pizzas)
    // });

//   }, [])

//   return (
//     <div className="App">
//       <div className="wrapper">
//         <Header />
//         <div className="content">
//         <Routes>
//           <Route path="/" element={<Home items={pizzas}/>} exact/>
//           <Route path="/cart" element={<Cart />} exact />
//         </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

class App extends React.Component{
  
  componentDidMount(){
    axios.get('http://localhost:3000/bd.json').then(({ data }) => {
      this.props.setPizzas(data.pizzas);
    });

  }
  
  render() {
    return(
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home items={this.props.items}/>} exact/>
              <Route path="/cart" element={<Cart />} exact />
            </Routes>
          </div>
        </div>
      </div>
    )
  }  
};

const mapStateToProps = state => {
  return {
    items: state.pizzas.items,
    filters: state.filters,
  } 
};

const mapDispatchToProps = {
  setPizzas,
}  

export default connect(mapStateToProps, mapDispatchToProps)(App);
