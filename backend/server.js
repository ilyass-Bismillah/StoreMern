dotenv.config()
import dotenv from 'dotenv'
import express from 'express'
import data from "./data/data.js"
import connectDB from './config/db.js'

connectDB()
const port = process.env.PORT || 5000
const app = express()

app.get("/", (req, res) => {
    return res.send("hello")
})

app.get("/api/products", (req, res) => {
    return res.json(data)
})

app.get("/api/products/:id", (req, res) => {
    const product = data.find((p) => p._id === req.params.id)
    return res.json(product)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})