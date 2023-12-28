import React,{useEffect, useState, memo} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const param = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])
    
    const getProductDetails = async () => {
        // console.log(param.id);
        let result = await fetch(`http://localhost:5000/product/${param.id}`)
        result = await result.json();
        // console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
        
    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${param.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{'Content-Type':'application/json'}
        });
        result = await result.json();
        console.log(result);
        if(result.acknowledged && result.matchedCount>=1){
            alert("Updated Successfully");
            navigate('/'); 
        }
        else{
            alert("Not Updated");
        }
    }

  return (
    <div >
      <h1>Update Product</h1>
      <input className='inputBox' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Name'/>
      
      <input className='inputBox' type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='Price'/>
      
      <input className='inputBox' type="text" value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder='Category'/>
      
      <input className='inputBox' type="text" value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder='Company'/>
      
      <button style={{ margin:'auto', padding:'auto',display:'block',width:'200px', height:"30px", cursor:"pointer"}} onClick={updateProduct}>Update Product</button>
    </div>
  )
}

export default memo(UpdateProduct)