require('dotenv').config()
require('express-async-errors')
//async errors
const express =require('express');
const app = express();
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('<h1>store API</h1><a href="/api/v1/products">products route</h1>')
})
app.use('/api/v1/products',productsRouter)

//products route


app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async()=>{
    try {
        //connectdb
        await connectDB(process.env.MONGO_URI).then(console.log('db connected...'))
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()