import React, { useEffect, useState , memo} from 'react'
import {Link} from 'react-router-dom'

const ProductList = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async () => {

        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }
    // console.log(products);

    const deleteProduct = async (id) => {
        // console.log(id);
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:'Delete'
        });
        result = await result.json();
        if(result.deletedCount >= 1 && result.acknowledged){
            getProducts();
            alert("Product was Deleted Succesfully")
            // console.log(result);
        }
        else{
            alert("Product Not Deleted");
        }
    }

    const searchHandle = async (event) => {
        // console.log(event.target.value);
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result);
            }
        }
        else{
            getProducts();
        }
    }
  return (
    <div className='product-list'>
      <h1>Products</h1>
      <input type="text" placeholder='Search Product' style={{width:"400px",margin:"20px",height:"40px",border:"1px solid skyblue",paddingLeft:"20px"}} onChange={searchHandle}/>
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {

        products.length>0 ? products.map((item,index)=>
            <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>
                    <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                    <Link to={"/update/"+item._id}>updateProduct</Link>  
                </li>    
            </ul>
        ) 
        : <h1>No Result Found</h1>

      }
    </div>
  )
}

export default memo(ProductList)
