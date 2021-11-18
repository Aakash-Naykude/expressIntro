const express = require("express")
const app = express()
const data = require("./MOCK_DATA.json")
app.use(express.json())
//get all user
app.get("/", (req, res)=>{
    return res.send(data);
})
//add another user
app.post("/books", (req, res)=>{
    //console.log(req.body)
    let newentry = [...data, req.body]
    res.send(newentry)
})
//get only one user
app.get("/books/:author", (req, res)=>{
    console.log(req.params.author)
    const newuser = data.filter((user)=>user.author === req.params.author)
    console.log(newuser)
    res.send(newuser)
})
//update user using patch
app.patch("/books/:author", (req, res)=>{
    const newuse = data.filter((user)=>{
        if(req.params.author === user.author){
            if(req?.body?.author) user.author = req.body.author;
            if(req?.body?.country) user.country = req.body.country;
            if(req?.body?.imageLink) user.imageLink = req.body.imageLink;
            if(req?.body?.language) user.language = req.body.language;
            if(req?.body?.link) user.link = req.body.link;
            if(req?.body?.pages) user.pages = req.body.pages;
            if(req?.body?.title) user.link = req.body.title;
            if(req?.body?.year) user.year = req.body.year;
        }
        return user
    })
    res.send(newuse)
})
//delete the user
app.delete("/books/:author", (req, res)=>{
    const newuser = data.filter((user)=>user.author !== req.params.author)
    console.log(newuser)
    res.send(newuser)
})
app.listen(2450, ()=>{
    console.log('listning to port 2450')
})