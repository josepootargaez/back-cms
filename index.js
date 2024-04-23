require('dotenv/config');
const express = require('express');
const app = express();
const port = process.env.PORT_SERVER;
const router = require('./src/routes/routes')
const  morgan = require('morgan')
const cors = require('cors');

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
//routes
app.use(router);

app.listen(port,()=>{
    console.log("Server is listening on port", port);
})

module.exports= app;