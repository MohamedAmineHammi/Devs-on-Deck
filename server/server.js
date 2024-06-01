const express = require('express')
const cors = require('cors')

require('./config/mongoose.config')



const PORT = 3001
const app = express()

//middleware
app.use(express.json(),
    express.urlencoded({ extended: true }),
    cors(
        {
            origin: ["http://localhost:3000"],
            credentials: true
        }))

const devRoutes = require('./routes/developer.route')
devRoutes(app)

const orgRoute = require('./routes/org.route')
orgRoute(app)


app.listen(PORT, () => console.log(`The server is running on PORT ${PORT}`))