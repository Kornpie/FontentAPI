import React from 'react';
import {BrowserRouter as Router, Route , Switch} from "react-router-dom";
// react-dom ติดตั้งเพื่อใช้ในการการลิ้งค์
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Menu from "./component/Menu";

const App = () => {
  return (

       <Router>
         <Menu />
         <Switch>
           <Route exact path="/" component={Home} />
           {/* ลิ้งค์ไปหน้าที่กำหนด */}
           <Route path="/home" component={Home} />
           <Route path="/add" component={AddProduct} />
           <Route path="/edit/:id" component={EditProduct} />
         </Switch>
       </Router>
  );
};

export default App;