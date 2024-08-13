const productModel = require("../models/productModel");
const { v4 : uuidv4  } = require('uuid');

//GET METHOD
exports.getProducts = async (req,res) => {
    try{
        const products  = await productModel.find()
        res.send(products);
    }
    catch(err) {
      console.log(err);
    }
};
// POST METHOD
exports.postProducts = async (req,res) => {
  try{
      const { title , description , price , category , image , rating} = req.body;

      const product = new productModel({
        id : uuidv4(),
        title,
        description,
        category,
        price,
        rating,
        image,
      })
      await product.save();
      res.status(200).json("Product Created Successfullyy")     
  }
  catch(err){
    console.log(err);   
  }
};
// DELETE METHOD
exports.deleteProducts = async (req, res) => {
  try {
    const  id  = req.params;
    const product = await productModel.findOneAndDelete({id});
    if (!product) {
      return res.status(404).json("Product not found");
    }
    res.status(200).json("Product deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

//PUT METHOD
exports.putProducts = async (req,res) => {
  try{
    const { id } = req.params;
    const { title , description , price , category , image , rating} = req.body;
    const product = await productModel.findByIdAndUpdate(id,{$set:{title,description,price,category,image,rating}});
    if(!product)
    {
      return res.status(404).json("Product is not found");
    }
    res.status(200).json("Product is updated by put");
  }
  catch(err)
  {
    console.log(err);
    res.status(500).json("SERVER ERROR");
    
  }
};

//PATCH METHOD
exports.patchProducts = async (req,res) => {
  try{
    const { id } = req.params;
    const update = req.body;
    const product = await productModel.findByIdAndUpdate(id,update,{new:true});
    if(!product)
    {
      return res.status(404).json("Product is not found");
    }
    res.status(200).json("Product is updated by patch");
  }
  catch(err)
  {
    console.log(err);
    res.status(500).json("SERVER ERROR");
    
  }
};
