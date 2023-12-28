const Connection = require('./db/config');
Connection();

const cors = require('cors');

const User = require('./db/Users');
const Product = require('./db/Product');

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

// Json
app.use(express.json());
app.use(cors());

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: 'parthiv.padariya@gmail.com', // Your email address
    pass: 'zzfu tcre zkrs viok', // Your email password
  },
});

app.get('/sendmail', () => {
    const otp = 100;
    const mailOptions = {
        from: 'parthiv.padariya@gmail.com',
        to: 'parthiv.padariya@gmail.com', // Recipient's email address
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
    };

    transporter.sendMail(mailOptions,(error, info) => {
        if (error) {
            console.log("Error");
            return res.json({Error:"error"});
        }
        else{
            console.log('Email sent successfully:', info.response);
            return res.json({});
        }
    })
})

app.post('/register',async (req,res) => {
    let data = new User(req.body);
    console.log("Register",req.body);
    let result = await data.save();
    // console.log(result);
    result = result.toObject();
    delete result.password;
    res.status(201).send(result);
    res.end();
})

app.post('/login',async (req,res) => {
    // Hear In req Parameter we have to see cookie 
    // so hear req parameter also contain cookie and locastorage informatoin does not pass in req 
    /*
    Check the request headers of the image requests and you will see that the cookie headers are sent. And the answer is - yes. Cookies are sent in all the requests.
    */
    console.log(req);
    if(req.body.name && req.body.email)
    {
        const d = req.body;
        console.log("Request",d);
        let user = await User.findOne(req.body).select('-password');
        
        console.log("Finding..",user);
        if(user){
            const token = jwt.sign({user},"Parthiv", {expiresIn: 604800});
            // console.log(token);
            return res.send({...user,token});
        }
        else{
            res.send(false)
        }
    }
})

// Add Product
app.post('/add-product',async (req,res) => {
    console.log(req.headers.cookie);
    let product = new Product(req.body);
    let result = await product.save();
    if(result){
        res.send(result);
    }
    else{
        res.send(false);
    }
})

// get Product
app.get('/products',async (req,res) => {
    let products = await Product.find(req.body);
    console.log(products);
    if(products.length > 0){
        res.send(products)
    }
    else{
        res.send(false);
    }
})

// Delete Product
app.delete('/product/:id',async (req,res) => {
    // console.log(req.params.id);
    let result = await Product.deleteOne({_id : req.params.id});
    // console.log(result);
    res.send(result);
});

// Get Data Corresponding to id
app.get('/product/:id',async (req,res) => {
    let result = await Product.findOne({ _id : req.params.id    });
    // console.log(result);
    res.send(result)
});

// Update Data
app.put('/product/:id',async (req,res) => {
    // let result = await Product.findOne({ _id : req.params.id}).updateOne(req.body);
    let result = await Product.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )
    // console.log(result);
    res.send(result)
})

// Search Key
app.get('/search/:key',async (req,res) => {
    let result = await Product.find({
        "$or" : [
            { name : {$regex : req.params.key}},
            { company : {$regex : req.params.key}},
            { category : {$regex : req.params.key}}
        ]
    })

    res.send(result);
})

app.listen(5000,(err) => {
    if(!err){
        console.log("Server Started");
    }
})