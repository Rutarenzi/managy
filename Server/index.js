const express = require('express')
const fs = require('fs')
const morgan = require("morgan")
const app = express()
const { config } = require("dotenv")
const { env } = require('process')
const { connectToDB } = require('./utils/mongodb.connect')
const cors = require('cors')
const options = require('./utils/cors.util')

// swagger setup
const swaggerUi  = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const customCss = fs.readFileSync(process.cwd() + '/swagger.css', 'utf8')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));
config()
const port = env.PORT
connectToDB()
app.use(express.json())
app.use(cors(options))

// log request details to the console
app.use(express.json())
app.use(morgan("short"))

app.use('/admin',require('./modules/admin'))
app.use('/auth', require('./modules/auth/auth.controller'))
app.use('/assetManagement', require('./modules/assets'))
app.use("/stock", require("./modules/stock"))

app.use('/reports', require('./modules/reports/controller'))


app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
    const pass = "password";
    const hashPassword = require("./generators/hashPassword");
    const hash = hashPassword.hashPassword(pass);
    console.log(hash);
})


