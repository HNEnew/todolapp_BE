
const { ObjectId } = require('mongodb')
const { connectToDb } = require('../DBsetup/config')
const todos = 'todos'

async function getListController(req, res) {
    const mongoConnection = await connectToDb()
    const todolist = await mongoConnection.collection(todos).find().toArray()
    res.json(todolist)
}

async function postListController(req, res) {
    try {
        const mongoConnection = await connectToDb()
        const newItem = req.body
        if (!newItem || !newItem.name) {
            return res.status(400).json('Invalid item')
        }
        const result = await mongoConnection.collection(todos).insertOne(newItem)
        console.log(result)
        res.json({ succes: 'New item added to list', id: result.insertedId })
    } catch (error) {
        res.status(500).json(error.toString())
        console.log(error)
    }
}

const editListController = async (req, res) => {
    try {
        const mongoConnection = await connectToDb()
        const { name, id } = req.body
        console.log(req.body)
        const result = await mongoConnection.collection(todos).updateOne({ "_id": new ObjectId(id) }, { $set: { "name": name } })
        console.log(result)
        if (result.modifiedCount == 1) {
            res.json({ succes: 'Updated one item succesfully' })
        } else {
            res.json({ error: 'invalid request' })
        }
    } catch (error) {
        res.status(500).json(error.toString())
        console.log(error)
    }
}

const deleteListController = async (req, res) => {
    try {
        const mongoConnection = await connectToDb()
        const itemId = req.params.id
        console.log(itemId)
        const result = await mongoConnection.collection(todos).deleteOne({ _id: new ObjectId(itemId) })
        if (result.deletedCount == 1) {
            res.json({ succes: 'One item deleted succesfully' })
        } else { res.json({ error: 'Item not found' }) }
    } catch (error) {
        res.status(500).json(error.toString())
        console.log(error)
    }
}
module.exports = { getListController, postListController, deleteListController, editListController }