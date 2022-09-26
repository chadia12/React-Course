
const bcrypt = require("bcrypt");
const User =require('../models/user');

 exports.deleteUser = async(req, res) =>{
    const result = await User.findByIdAndDelete(req.params.id);
    res.json(result);
  //  if (req.body.userId === req.params.id) {
  //     try {
  //       const user = await User.findById(req.params.id);
  //       try {
  //         await Post.deleteMany({ username: user.username });
  //         await User.findByIdAndDelete(req.params.id);
  //         res.status(200).json("User has been deleted...");
  //       } catch (err) {
  //         res.status(500).json(err);
  //       }
  //     } catch (err) {
  //       res.status(404).json("User not found!");
  //     }
  //   } else {
  //     res.status(401).json("You can delete only your account!");
  //   }

 }

 exports.updateUser = async (req, res) =>{
    // const result= await User.updateOne({_id:new ObjectId(req.params.id)}, req.body);
   //  res.json(result)
   if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your account!");
    }
 }

 exports.getAllUser= async (req, res) =>{
    const allUser= await User.find();
    res.json(allUser)
 }

 exports.getUserById = async (req, res) =>{
   //  const findUser = await User.findById(req.params.id);
   //  res.json(findUser);
   try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
 }