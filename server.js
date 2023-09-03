const exp = require('express');
const express = exp();
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
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
       }
    ]
}

express.get('/', (req, res)=>{
    res.send('this is working')
})


express.post('/signin',(req,res)=>{
    res.json('signed in')
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