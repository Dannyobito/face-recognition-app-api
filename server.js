const exp = require('express');
const bcrypt = require('bcrypt-nodejs')
const express = exp();
express.use(exp.urlencoded({extended: false}));
express.use(exp.json());
const database = {
    users: [
       {
        id: '123',
        name: 'John',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date(),
       },
       {
        id: '124',
        name: 'Sally',
        email: 'sally@gmail.com',
        password: 'bananas',
        entries: 0,
        joined: new Date()
       }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

express.get('/', (req, res)=>{
    
    res.send(database.users);        
})


express.post('/signin',(req,res)=>{
    bcrypt.compare("apple", '$2a$10$e2oFKWu0dYw6/MLjQ6H28uMuoB6EZ1K2XKxbsBfLXS3AMf5vz3gq.', function(err, res) {
        console.log('1',res);
    });
    bcrypt.compare("veggies", '$2a$10$e2oFKWu0dYw6/MLjQ6H28uMuoB6EZ1K2XKxbsBfLXS3AMf5vz3gq.', function(err, res) {
        console.log('2',res);
    });
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json('success');
    } else{
        res.status(400).json('error logging in');
    }
});
express.post('/register',(req,res)=>{
    const {name,email,password} = req.body;

    bcrypt.hash("bacon", null, null, function(err, hash) {
       console.log(hash);
    });
    
    database.users.push({
            id: '125',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date(),
    })
    res.json(database.users[database.users.length-1])
})
express.get('/profile/:id',(req,res)=>{
    const {id} = req.params
    let found = false
    database.users.forEach(user=> {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json("no such user");
    }
})
express.put('/image',(req,res)=>{
    const {id} = req.body;
    let found = false;
    database.users.forEach(user=> {
        if(user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json("no such user");
    }
})



// // Load hash from your password DB.

express.listen(3000,()=>{
    console.log('app is  running on port 3000');
});

























/*
/ --> res = this is working
/signin -> POST --> res = success/fail
/register -> POST --> res = new user
/profile:userId -> GET --> user
/image -> PUT --> res = updated user
*/