const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const Post=require("./Models/posts")

app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("connected successfully.");
})
.catch((err) => {
    console.log( "ERROR : ", err);
});

//home route
app.get('/', async(req, res) => {
    let allPosts=await Post.find();
    res.send(allPosts)
});

//create route
app.post("/", async (req, res) => {
    let { title, description } = req.body;
    const newPost = new Post({
        title: title,
        description: description,
    });
    try {
        const savedPost = await newPost.save();
        console.log(savedPost);
        res.send(savedPost); 
    } catch (error) {
        console.error("Error saving post:", error);
        res.status(500).json({ error: "Failed to save the post" });
    }
});

//delete route
app.delete("/:id", async (req, res) => {
    const postId = req.params.id; // Extract post ID from request parameters
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
        return res.status(404).json({ error: "Post not found" });
    }
    console.log("Deleted post:", deletedPost);
    res.status(200).json({ message: "Post deleted successfully" });
});

//get single post
app.get("/:id",async(req,res)=>{
    const postId=req.params.id;
    const showPost=await Post.findById(postId);
    console.log(showPost);
    res.send(showPost)
})

//update route
app.patch("/:id",async(req,res)=>{
    const {title,description}=req.body;
    const postId=req.params.id;
    let updateFields = {};
    if (title) {
      updateFields.title = title;
    }
    if (description) {
      updateFields.description = description;
    }
    let updatedPost=await Post.findByIdAndUpdate(postId,{ $set: updateFields },{new:true})
    res.send(updatedPost)
})

app.listen(process.env.PORT||8080, () => {
    console.log(`Server is listening on port 8080`);
});