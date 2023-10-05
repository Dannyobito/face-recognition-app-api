const exp = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { handleRegister } = require('./controllers/register');
const { handleSignin } = require('./controllers/signin');
const { handleProfileGet } = require('./controllers/profile');
const { handleImage, handleImageUrl } = require('./controllers/image');

const express = exp();
express.use(exp.urlencoded({extended: false}));
express.use(exp.json());
express.use(cors());
const PORT = process.env.PORT;


const db = knex({
    client: 'pg',
    connection: {
        connectionString: `${process.env.DATABASE_URL}`,
        // host : `${process.env.DATABASE_HOST}`,
        // user : `${process.env.DATABASE_USER}`,
        // password : `${process.env.DATABASE_PASSWORD}` ,
        // database: 'facerecognitionapp',
        rejectUnauthorized: false
    }
});

express.get('/', (req, res)=>{res.status(200).json("Success")});
express.post('/signin',(req,res)=>{handleSignin(req,res,bcrypt,db)});
express.post('/register',(req,res)=>{handleRegister(req,res,bcrypt,db)})
express.get('/profile/:id',(req,res)=>{handleProfileGet(req,res,db)})
express.put('/image',(req,res) => {handleImage(req,res,db)})
express.post('/imageUrl',(req,res)=>handleImageUrl(req,res))

express.listen(PORT || 3999,()=>{
    console.log(`app is  running on port ${PORT||"3999"}`);
});
console.log(process.env.CLARIFAIAPIKEY);

























/*
/ --> res = this is working
/signin -> POST --> res = success/fail
/register -> POST --> res = new user
/profile:userId -> GET --> user
/image -> PUT --> res = updated user
*/