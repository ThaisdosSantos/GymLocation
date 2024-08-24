// Classe para transformar em abstração para o db

const Sequelize = require('sequelize')
const db = require('../db/connection')

const Gym = db.define('gym', {
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.STRING,
    },
    company: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    new_gym: {
        type: Sequelize.INTEGER,

    }

})

module.exports = Gym