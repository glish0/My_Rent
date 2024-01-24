const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()

const authRoutes = require("./routes/auth.js")

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

//Routes

app.use("auth", authRoutes)

// Mongoose setup 

const PORT = 5000
mongoose.connect(process.env.MONGO_URL, {
    dbName: "My_rent",
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => console.log(`server port : ${PORT}`));
})
.catch((err) => console.log(`${err} did not connect`))