import { model } from "mongoose"

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true ,
    },
    pssword: {
      type: String,
      required: true,
    },
    profileImagePath: {
      type: String,
      default: "",
    },
    tripList: {
      type: Array,
      default: [],
    },
    wishList: {
      type: Array,
      default: [],
    },
    propertyList: {
      type: Array,
      default: [],
    },
    reservationList: {
      type: Array,
      default: [],
    },   
  },
  { timestamps:true}
)


const User = mongoose.model('User', UserSchema)
module.exports = "User"