

const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const path = require('path')
const db = require('./db/connection')
const bodyParser = require('body-parser')

const Gym = require('./models/Gym')
const { where } = require('sequelize')
const { title } = require('process')
const sequelize = require('sequelize')
const { error } = require('console')
const Op = sequelize.Op

const PORT = 3000

app.listen(PORT, function () {
    console.log(`O express está  rodando na porta ${PORT}`)
})

// Utilizar body parser
app.use(bodyParser.urlencoded({ extended: false }))

// handle bars
app.set('views', path.join(__dirname, 'views'))  //setar direitorio views
// arq princ layout
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))

app.set('view engine', 'hbs')

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// db connection
db
    .authenticate()
    .then(() => {
        console.log('Connectou ao banco com sucesso')
    })
    .catch(err => {
        console.log('Error ao conectar', err)
    })

// routes  
app.get('/', (req, res) => {
// Busca por titulo
    let search = req.query.gym
    let query = ' ' + search + '%' //por abreviação

    if (!search) {
        // Chamar o método, encontrar as gyms
        Gym.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(gyms => {
                res.render('index', {
                    gyms
                })
            })
            .catch(err => console.log(err))
    }
    else {
        // Chamar o método, encontrar as gyms
        Gym.findAll({
            where: { title: { [Op.like]: search } },
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(gyms => {
                res.render('index', {
                    gyms, search
                })
            })
            .catch(err => console.log(err))

    }


})

// gyms routes
app.use('/gyms', require('./routes/gyms'))