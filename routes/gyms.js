const express = require('express')
const router = express.Router()
const Gym = require('../models/Gym')
const { where } = require('sequelize')

router.get('/test', (req, res) => {
    res.send('Deu certo')

})
// Detalhes da academia
router.get('/view/:id', (req, res) => Gym.findOne({
    where: {id: req.params.id}
}).then(gym => {
    res.render('view', {
        gym
    })
   
}).catch(err => console.log(err)))


// Form da rota de envio

// Fazer a busca
router.get('/add', (req, res) => {
    res.render('add')

})

//  add gym via post
router.post('/add', (req, res) => {
    let {title, price, company, description, email, new_gym} = req.body


    // Insert
    Gym.create({
        title, 
        price,
        company, 
        description,
        email,
        new_gym

    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router