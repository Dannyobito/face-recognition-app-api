const clarifai = require('clarifai');
const app = new clarifai.App({
    apiKey: `${process.env.CLARIFAIAPIKEY}`
   });
   
const handleImage = (req,res,db)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries',1).returning('entries').then(entries =>{
        res.json(entries[0].entries);
    }).catch(err => res.status(400).json('unable to update entries'))
}
const handleImageUrl = (req,res) => {
    const {imageUrl} = req.body
    app.models.predict('face-detection', imageUrl)
    .then(response => {
        res.json(response)
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json("unable to connect to clarifai")
    })
}
module.exports = {
    handleImage:handleImage,
    handleImageUrl:handleImageUrl
}