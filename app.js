//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose= require("mongoose");



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://vikyathrao-admin:test123@cluster0.vhdacwg.mongodb.net/journelDB");

const contentSchema = new mongoose.Schema({
    contentTitle:String,
    contentBody:String
});
const Content = mongoose.model("Content",contentSchema);

let posts = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/post/:topic",(req,res) =>{

   let urlName = lodash.lowerCase(req.params.topic);
   
   Content.findOne({contentTitle:urlName}).then((foundList)=>{
        if(!foundList){
         console.log(foundList.contentTitle+" Enter corrent content Title "+foundList.contentBody);
        }else{
         res.render("post",{title:foundList.contentTitle,para:foundList.contentBody})
        }
   }).catch((err)=>{
      console.log(err);
   });   
});

app.get("/",(req,res) =>{
  
   Content.find({}).then((foundList)=>{
      res.render("home",{p1:homeStartingContent,newPosts:foundList});
   });

   
});

app.get("/about",(req,res) =>{
   res.render("about",{p2:aboutContent});
});

app.get("/contact",(req,res)=>{
   res.render("contact",{p3:contactContent});
});

app.get("/compose",(req,res) =>{
   res.render("compose");
});

app.post("/compose",(req,res) =>{
 var post ={
  newTitle : lodash.lowerCase(req.body.publishTitle),
  newPost : lodash.lowerCase(req.body.publishText)
 };
  const newSubmission = new Content({
   contentTitle:post.newTitle,
   contentBody:post.newPost
 });
 newSubmission.save();

//  posts.push(post);
//  console.log(posts);
 res.redirect("/");
});










app.listen(3000 || process.env.PORT, function() {
  console.log("Server started on port 3000");
});
