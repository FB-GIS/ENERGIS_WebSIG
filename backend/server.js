const express = require("express")
const app = express()
const mysql = require("promise-mysql")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use(express.static(__dirname + '/public'))

const dotenv = require("dotenv")
dotenv.config()

//Routes import
const userRoutes = require("./routes/userRoutes")
const projectRoutes = require("./routes/projectRoutes")
const projectAreaRoutes = require("./routes/projectAreaRoutes")
const roleRoutes = require("./routes/roleRoutes")
const windModelRoutes = require("./routes/windModelRoutes")
const typeSolarRoutes = require("./routes/typeSolarRoutes")
const statusProjectRoutes = require("./routes/statusProjectRoutes")
const developerRoutes = require("./routes/developerRoutes")
const authRoutes = require("./routes/authRoutes")


// Connexion to the database
mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }).then((db) => {
        console.log('Connexion à la base de données avec succès.')
        
        setInterval(async function(){
        let res = await db.query('SELECT 1')
        }, 10000)

        app.get('/', async(req, res) => {
            res.json({ status: 200, msg: "WebGIS Application" })
        })
        
        userRoutes(app, db)
        projectRoutes(app, db)
        projectAreaRoutes(app, db)
        roleRoutes(app, db)
        windModelRoutes(app, db)
        typeSolarRoutes(app, db)
        statusProjectRoutes(app, db)
        developerRoutes(app, db)
        authRoutes(app, db)
    })
    .catch(err => console.log(err))

//Server launch on port 9500
const PORT = process.env.PORT || 9500

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`)
})
