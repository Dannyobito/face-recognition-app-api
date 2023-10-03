const exp = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { handleRegister } = require('./controllers/register');
const { handleSignin } = require('./controllers/signin');
const { handleProfileGet } = require('./controllers/profile');
const { handleImage } = require('./controllers/image');

const express = exp();
express.use(exp.urlencoded({extended: false}));
express.use(exp.json());
express.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'obito',
        database: 'facerecognitionapp'
    }
});

express.get('/', (req, res)=>{res.status(200).json("Success")});
express.post('/signin',(req,res)=>{handleSignin(req,res,bcrypt,db)});
express.post('/register',(req,res)=>{handleRegister(req,res,bcrypt,db)})
express.get('/profile/:id',(req,res)=>{handleProfileGet(req,res,db)})
express.put('/image',(req,res) => {handleImage(req,res,db)})

express.listen(3999,()=>{
    console.log('app is  running on port 3999');
});

























/*
/ --> res = this is working
/signin -> POST --> res = success/fail
/register -> POST --> res = new user
/profile:userId -> GET --> user
/image -> PUT --> res = updated user
*/