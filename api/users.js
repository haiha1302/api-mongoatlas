const express = require('express')
const usersController = require('../controller/usersController')

const router = express.Router()

router.get('/', async (req, res) => {
    const users = await usersController.getUsers()
    res.json(users)
})

router.get('/:id', async (req, res) => {
    try {
        const user = await usersController.getUserById(req.params.id)
        res.json(user)
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const idUser = await usersController.countAllUsers() + 1
    
    try {
        const user = await usersController.postNewUser(name, age, idUser)
        res.json(user) 
    } catch (err) {
        res.status(401).send(err.message)
    }
})

router.put('/:id', async (req, res) => {
    const name = req.body.name
    const age = req.body.age
    try {
        const user = await usersController.putUpdateUser(req.params.id, name, age)
        res.json(user)
    } catch (err) {
        res.status(401).send(err.message)
    }
    res.json(user)
})

router.delete('/:id', async (req, res) => {
    const idUser = await usersController.getUserById(req.params.id)

    if (!idUser) {
        res.send('There is no user to delete!!!')
    } else {
        await usersController.deleteUserById(req.params.id)
        res.send('User has been deleteed!!!')
    }
})

module.exports = router