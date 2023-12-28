import React, { memo, useState } from 'react'

const AddPoduct = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const [validation,setValidation] = useState("false");

    const addProduct = async () => {
        // Checking a Validation
        if(!name || !price || !category || !company ){
            setValidation('true');
            alert("Failed");
            return;
        }
        // console.log(name,price);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.log(userId);
        const productData = {name,price,category,company,userId};

        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify(productData),
            headers:{'Content-type':'application/json'}
        })

        result = await result.json();
        if(result){
            alert("Data Added SuccessFulliy");
        }
        else{
            alert("Failed");
        }

        setName("");
        setPrice("");
        setCategory("");
        setCompany('');
    }
  return (
    <div >
      <h1>Add Product</h1>
      <input className='inputBox' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Name'/>
      {validation && !name && <span style={{color:'red',display:'block',textAlign:'center'}}>Enter Valid Name</span> }
      
      <input className='inputBox' type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='Price'/>
      {validation && !price && <span style={{color:'red',display:'block',textAlign:'center'}}>Enter Valid Price</span> }
      
      <input className='inputBox' type="text" value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder='Category'/>
      {validation && !category && <span style={{color:'red',display:'block',textAlign:'center'}}>Enter Valid category</span> }
      
      <input className='inputBox' type="text" value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder='Company'/>
      {validation && !company && <span style={{color:'red',display:'block',textAlign:'center'}}>Enter Valid Company</span> }
      
      <button style={{ margin:'auto', padding:'auto',display:'block',width:'100px', height:"30px", cursor:"pointer"}} onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default memo(AddPoduct)
