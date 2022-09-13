const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config()
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");


const app = express();

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

//db 
dbConnect();

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//middleware
app.use(express.json())

//cors
app.use(cors())

//users route
app.use("/api", userRoutes)

//error handler
app.use(notFound)
app.use(errorHandler)
//server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server is running on port: ${PORT}`))

//NW5I0Tq1DUCv898K

//send grid
//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
