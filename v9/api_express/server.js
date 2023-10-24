const express = require('express');
const cors = require('cors');

let DB = require('./db.config')

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const user_router = require('./routes/users')
const place_router = require('./routes/places')


app.get("/", (req, res) => res.send("I'm online. Well done!"))
app.use('/users', user_router)
app.use('/places', place_router)

app.get("*", (req, res) => res.status(501).send("Mauvaise Requête"))

DB.authenticate()
    .then(() => console.log("Database connection OK"))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}`)
        })
    })
    .catch(err => console.log("Database error", err))


