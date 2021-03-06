import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import ShowInfo from './components/ShowInfo'
import type { ProductType } from './types/product';
import { list, remove } from './api/product';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Managerproduct from './pages/Managerproduct';
import Products from './pages/Products';
import WebsiteLayout from './pages/layout/WebsiteLayout';
import AdminLayout from './pages/layout/AdminLayout';
import Home from './pages/Home';

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  // const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
     const getProducts = async () => {
        const { data } = await list();
        setProducts(data);
     }
     getProducts();
  },[])

  const removeItem = async (id: number) => {
    // xoa tren API
    const { data } = await remove(id);
    // reRender
    data && setProducts(products.filter(item => item._id !== data._id));
  }
  return (
    <div className="App">
      {/* <table>
        <thead>
          <th>#</th>
          <th>Name</th>
          <th></th>
        </thead>
        <tbody>
          {products.map((item, index) => {
            return <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <button onClick={() => removeItem(item._id)}>Remove</button>
                    </td>
                  </tr>
          })}
          
        </tbody>
      </table>
       */}
       <header>
        <ul>
          <li><NavLink to="/">Home page</NavLink></li>
          <li><NavLink to="/product">Product</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </header>
      <main>
        <Routes>
      {/* <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="product" element={<h1>Product page</h1>} />
      </Routes> */}
      <Route path="/" element={<WebsiteLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="Product" element={<Products/>}/>
      </Route>
      <Route path="admin" element={<AdminLayout />}> 
          <Route index element={<Navigate to="dashboard"/>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Managerproduct />} />
        </Route>
      </Routes>
      </main>
      
    </div>
  )
}

export default App
