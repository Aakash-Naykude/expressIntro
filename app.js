const express = require("express");
const app = express();
const data = require("./MOCK_DATA.json");
app.use(express.json());



//get all user
// app.get("/", (req, res) => {
//   return res.send(data);
// });



//add another user
app.post("/books", (req, res) => {
  //console.log(req.body)
  let newentry = [...data, req.body];
  res.send(newentry);
});



//get only one user
// 







//update user using patch
app.patch("/books/:author", (req, res) => {
  const newuse = data.filter((user) => {
    if (Number(req.params.author) === user.author) {
      if (req?.body?.author) user.author = req.body.author;
      if (req?.body?.book_name) user.book_name = req.body.book_name;
      if (req?.body?.pages) user.pages = req.body.pages;
      if (req?.body?.published_year) user.published_year = req.body.published_year;
    }
    return user;
  });
  res.send(newuse);
});


//delete the user
app.delete("/books/:author", (req, res) => {
  const newuser = data.filter((user) => user.author !== Number(req.params.author));
  //console.log(newuser)
  res.send(newuser);
});







//middleware 1
var newuser = "abc"
const authenticate = (req, res, send)=>{
    console.log('authenticate')
    send()
}
//middlware 2
const authorise = (permission) => {
    return (req, res, next) => {
      const originalSendFunc = res.send.bind(res);
      res.send = function (body) {
        body.api_requested_by = "Aakash Naykude";
        body.books = newuser;
        console.log(newuser); // do whatever here
        return originalSendFunc(body);
        };
      next();
    };
};
//middleware ended
//get all user and use middleware
app.get("/", authenticate, authorise("req"), (req, res)=>{
    newuser = data
    res.send({})
})
//get single user and use middleware
app.get("/books/:author",  authenticate, authorise("req"), (req, res)=>{
    newuser = data.filter((user) => user.author === Number(req.params.author));
    newuser = newuser[0]
    //console.log(newuser)
    res.send({})
    //res.send({"api_requested_by": "Aakash Naykude", "book":newuser[0]})
})


app.listen(2450, () => {
  console.log("listning to port 2450");
});
