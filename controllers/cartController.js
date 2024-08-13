const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");

exports.createCart = async (req, res) => {
  const { user_id } = req.user;
  const { productId, quantity } = req.body;

  try {
    let cart = await cartModel.findOne({ user_id });

    if (!cart) {
      const newCart = new cartModel({
        user_id,
        products: [
          {
            productId,
            quantity,
          },
        ],
      });
      await newCart.save();
      return res.status(201).json("New cart created succcessfully");
    } else {
      const existingProduct = cart.products.find(
        (products) => products.productId === productId
      );

      if (existingProduct) {
        existingProduct.quantity = quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
      return res.status(200).json("Cart updated successfully");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getCart = async (req, res) => {
  try {
    const { user_id } = req.user;
    const cart = await cartModel.findOne({ user_id });
    console.log(cart);
    if (!cart) {
      return res.status(404).json("Cart not found for the user");
    }
    let subtotal = 0;
    const productItems = await Promise.all(
      cart.products.map(async (product) => {
        const productDetails = await productModel.findOne({ id: product.productId });
        subtotal += productDetails.price * product.quantity;
        return {
          id: product.productId,
          quantity : product.quantity,
          title: productDetails.title,
          price: productDetails.price,
          description: productDetails.description,
          category: productDetails.category,
          image: productDetails.image,
          rating: productDetails.rating,
        };
      })
    );
    console.log(subtotal);
    res.status(200).json({subtotal,productItems});
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteCart = async (req,res) => {
   const{user_id} = req.user;
   const productId = req.params.id;
  
   if(!user_id){
    res.status(500).json("Sorry! USER is not loged in");
   }
   try{         
       const cartItems = await cartModel.findOne({user_id});
       if(!cartItems)
       {
        return res.status(404).json("Cart not found for the user");
       }
       const isProductExist = await cartItems.products.find(
        (product) => product.productId === productId
       );
       if(!isProductExist)
       {
         return res.status(404).json("Product not found in the cart");
       }
       if(cartItems.products.length == 1){
        await cartModel.deleteOne({user_id});
         return res.status(200).json("User Cart is deleted");
       }

       cartItems.products = await cartItems.products.filter((product) => product.productId != productId);
       await cartItems.save();
       
       res.status(200).json("Cart product deleted");
   } 
   catch(err){
    res.status(500).json(err);
   }
}