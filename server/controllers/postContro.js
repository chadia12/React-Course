const {ObjectId} = require("mongodb");
const Post = require('../models/post');

//CREATE POST
exports.save = async (req,res) =>{
    try {
        const newPost = new Post(req.body).save();
        res.status(200).json(newPost);
      } catch (err) {
        res.status(500).json(err);
      }
}

//SEARCH POST
exports.searchPost = async (req, res) =>{
  try{
    
const srch = await Post.find({title: {$regex: req.params.search , $options: 'i'}});
res.json(srch);
  }catch(err){
    res.status(500).json(err);
  }
}

//GET POST BY ID
exports.getPostById = async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
      } catch (err) {
        res.status(500).json(err);
      }
};

//GET ALL POSTS
  exports.getAllPosts = async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username){
            posts =await Post.find({ username});
        }
        else if(catName){
posts = await Post.find({ categories:{$in: [catName],},});
        }
        else{
            posts = await Post.find();  
        }
        res.status(200).json(posts);
    }catch(error){
        res.status(500).json(err);
    }
    
  };

// UPDATE POST
  exports.updatePost = async (req,res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
          try {
            const updPost = await Post.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            res.status(200).json(updPost);
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(401).json("You can update only your post!");
        }
      } catch (err) {
        res.status(500).json(err);
      }
  }

  //DELETE POST

  exports.deletePost = async (req,res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
          try {
            await post.delete();
            res.status(200).json("Post has been deleted...");
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(401).json("You can delete only your post!");
        }
      } catch (err) {
        res.status(500).json(err);
      }
  }
