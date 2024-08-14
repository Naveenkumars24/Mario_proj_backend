const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  try {
    const user_id = req.user.user_id; 
    const userDetails = await userModel.find({_id: user_id});
    console.log(userDetais);
    res.status(200).json(userDetails);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isEmailExist = await userModel.findOne({email});
    if (isEmailExist) {
      return res.status(400).json("Email already exist try another mail");
    }
    const user = new userModel({
      name,
      email,
      password,
    });
    await user.save();
    res.status(200).json("New User is added successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const user = await userModel.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json("User not found! , Invalid email or password");
    }
    const PasswordMatch = await bcrypt.compare(password, user.password);
    if (!PasswordMatch) {
      return res.status(400).json("User not found !, Invalid email or password");
    }
    const token = jwt.sign({ user_id: user._id , email : user.email}, "my-secret-code", {
      expiresIn: "1w",
    });
    return res.status(200).json(token);
  } catch (err) {
    res.status(500).json("Server error");
  }
};