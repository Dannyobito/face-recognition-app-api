const exp = require('express');

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
    ]
}

express.get('/', (req, res)=>{
    
    res.send('this is working');        
})


express.post('/signin',(req,res)=>{
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json('success');
    } else{
        res.status(400).json('error logging in');
    }
})

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