const { db } = require('../database')

const getUsers = async () => {
    const users = await db.users.find({}).toArray()
    return users
}

const getUserById = async (idUser) => {
    const user = await db.users.find({ 
        idUser: Number(idUser) 
    }).toArray()
    return user
}

const postNewUser = async (name, age, idUser) => {
    const existingUser = await db.users.findOne({
        name: name
    })
    const existingId = await db.users.findOne({
        idUser: +idUser
    })
    if (existingUser) {
        throw new Error('User is already existed!!!')
    } else if (existingId) {
        throw new Error('Id is already existed')
    } 
    const user = {
        name: name,
        age: age,
        idUser: idUser
    }
    await db.users.insertOne(user)
    return user
}

const putUpdateUser = async (idUser, name, age ) => {
    const query = {
        idUser: +idUser
    }

    const valueUpdate = {
        $set: {
            name: name,
            age: age
        }
    }
    await db.users.updateOne(
        query, 
        valueUpdate
    )
    .then (function(result) {
        return result
    })
    return {
        message: 'Success'
    }
}

const countAllUsers = async () => {
    const allUsers = await db.users.find({}).toArray()
    const count = allUsers.length
    return count
}

const deleteUserById = async (idUser) => {
    console.log(idUser);
    const query = {
        idUser: +idUser
    }

    await db.users.deleteOne(
        query,
        function (err, obj) {
            if (err) throw err
        }
    )
}

module.exports = { getUsers, getUserById, postNewUser, putUpdateUser, countAllUsers, deleteUserById }