import './App.css';
import Nav from './component/Nav'
import Footer from './component/footer'
import SignUp from './component/SignUp'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PrivateComponent from './component/PrivateComponent'
import Login from './component/Login'
import AddProduct from './component/AddPoduct'
import ProductList from './component/ProductList'
import UpdateProduct from './component/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>

        <Routes>
        
          {/* Making a Private Component */}
            <Route element={<PrivateComponent/>}>
              <Route path="/" element={<ProductList/>}></Route>
              <Route path='/add' element={<AddProduct/>}/>
              <Route path='/update/:id' element={<UpdateProduct/>}/>
              <Route path='/logout' element={<h1>Logout</h1>}/>
              <Route path='/profile' element={<h1>profile</h1>}/>
            </Route>

            {/* Non Private */}
            <Route path='/signup' element={<SignUp/>}/> 
            <Route path='/login' element={<Login/>}/>
        </Routes>

      </BrowserRouter>
      
      <Footer/>
    </div>
  );
}

export default App;
