const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");


router.get(`/`, async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get(`/:id`, async (req, res) => {
  const userList = await User.findById(req.params.id);

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.post("/", async (req, res) => {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      userpassword:req.body.userpassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin
      
    });
    user = await user.save();
  
    if (!user) return res.status(400).send("the user cannot be created!");
  
    res.send(user);
  });
  
  router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const secret=process.env.secret;
  
    if (!user) {
      return res.status(400).send("the user not found");
    }
    //return res.status(201).send(user);
    //let pass1=(String)(req.body.userpassword);
    //let pass2=(user.);
    //console.log(user.name)
    //let email=(user.email);
    if (user && (user.userpassword==req.body.userpassword) ) {
      const token =jwt.sign({
        userid:user.id, },
        secret,
        {expiresIn:"1d"}
        );
      res.status(200).send({user:user.email,token:token});
    } else {
      res.status(400).send("password is wrong");
    }
  });
  module.exports = router;