dotenv.config()
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import productRouter from './routes/productsRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

connectDB()
const port = process.env.PORT || 5000
const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }))

app.get("/", (req, res) => {
    return res.send("Hello World this is nodemone")
})

app.use('/api/products', productRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})