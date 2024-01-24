const router = require('express').Router()
const bcrypt = require('bcriptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const User = require('../models/User')

/* configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    cb(null, "public/uploads") // store uploader file in the "uploads" folder
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname) // use the original file name
  }
})

const upload = multer({ storage })

/* USER REGISTER */

router.post('/register', upload.single('profileImage'), async (res, req) => {
  try {
    // take all the information from the form
    const { first_name, last_name, email, password } = req.body

    // the uploaded file is available as req.file
    const profileImage = req.file

    if(!profileImage) {
      return res.status(400).send("No file uploaded")
    }

    // path to te uploadd profile photo

    const profileImagePath = profileImage.path

    // check if the user exist
    const existingUser = await User.findOne({email})
    if(existingUser) {
      return res.status(400).json({message: " User already exists !"})
    }

    /* hash the password */
    const salt = await bcrypt.genSalt()
    const hashPassword = bcrypt.ash(password, salt)

    //create a user
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashPassword,
      profileImagePath
    });

    // save the new user 
    await newUser.save()

    // send a successful message

    res.status(200).json({message: "User registered sucessfully", user: newUser})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Registration failed",error: error.message})
  }
})
module.exports = router