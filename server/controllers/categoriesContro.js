const Category = require("../models/category");

exports.save = async(req, res) =>{
    try {
        const newCat = await new Category(req.body).save();
        res.status(200).json(newCat);
      } catch (err) {
        res.status(500).json(err);
      }
}

exports.getCategories = async (req, res) =>{
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
      } catch (err) {
        res.status(500).json(err);
      }
}