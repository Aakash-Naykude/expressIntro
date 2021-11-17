const express = require("express")
const app = express()
const data = require("./MOCK_DATA.json")

app.get("/users", (req, res)=>{
    return res.send(data);
})
app.get("/singleuser", (req, res)=>{
    const a = {}
    a.name = "aakash";
    return res.send(a);
})
app.listen(2450, ()=>{
    console.log('listning to port 2450')
})