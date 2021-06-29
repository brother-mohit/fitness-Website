const express = require('express');
//const request= require("request");
const bodyParser= require('body-parser');
const ejs = require('ejs');
//const https= require("https");
const mongoose = require("mongoose");
const app= express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/fitnessBlogDatabase",{useNewUrlParser : true, useUnifiedTopology: true});

 const postSchema = mongoose.Schema({
      title : String,
      imgURL : String,
     content : String
 });

const Post = mongoose.model("Post",postSchema);





 var loggedIn="Sign Up";

app.get('/', function(req,res){

     // res.sendFile(__dirname+"/views/home.html");
     res.render("home.ejs",{loggedIn});

})

app.post('/',function(req,res){
   res.redirect('/');
})

app.get('/bmi', function(req,res){

   res.sendFile(__dirname+"/views/bmi.html");

})

app.get('/macros', function(req,res){

   res.sendFile(__dirname+"/views/macros.html");

})






// blog part start

// mongoose.connect("mongodb://localhost:27017/fitnessBlogDatabase",{useNewUrlParser : true, useUnifiedTopology: true});
//
//  const postSchema = mongoose.Schema({
//       title : String,
//       imgURL : String,
//      content : String
//  });
//
// const Post = mongoose.model("Post",postSchema);
//
//


 app.get("/blog",function(req,res){

    Post.find({},function(err,posts){

      if(!err)
       {
           res.render('blog.ejs',{ posts : posts});
       }
       else console.log(err);
    });
    //  res.render('home.ejs',{homecontent:homeStartingContent, posts : posts});

 });


 app.get("/compose",function(req,res){

      res.render('compose');

 });

 app.post("/compose",function(req,res){


       const post= new Post({
               title : req.body.inputTitle,
               imgURL : req.body.inputURL,
                content : req.body.inputPost
       });

      post.save();

     res.redirect("/blog");

 });


// blog part end



// signup part

app.get("/signup",function(req,res){


     if(loggedIn=="Log Out")
      {
         loggedIN= "Sign Up";
         res.redirect('/');
      }
    else
         res.render('signup.ejs');

});

app.post("/signup",function(req,res){

   loggedIn = "Log Out";
   res.redirect('/');
});








app.listen(process.env.PORT || 3000,function(){
console.log("Server is running at port 3000.");
});
