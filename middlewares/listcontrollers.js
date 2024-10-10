
const todos = 'todos'

async function getListController(req, res) {
    res.json({ user: req.user })
}

async function postListController(req, res) {
    try {
        const newItem = req.body
        const user = req.user
        if (!newItem || !newItem.item) {
            return res.status(400).json('Invalid item')
        }
        const result = await req.db.collection(todos).updateOne({ _id: user._id }, { $push: { 'todolist': newItem.item } })
        console.log(result)
        if (result.modifiedCount) {
            res.json({ succes: 'New item added to list' })
        } else { res.json({ message: 'Something error occured' }) }
    } catch (error) {
        res.status(500).json(error.toString())
        console.log(error)
    }
}

const editListController = async (req, res) => {
    try {
        const { item, itemIndex } = req.body
        const todolist = req.user.todolist
        todolist[itemIndex] = item
        const result = await req.db.collection(todos).updateOne({ _id: req.user._id }, { $set: { 'todolist': todolist } })
        if (result.modifiedCount == 1) {
            res.json({ succes: 'Updated one item succesfully' })
        } else {
            res.json({ message: 'invalid request' })
        }
    } catch (error) {
        res.status(500).json(error.toString())
        console.log(error)
    }
}

const deleteListController = async (req, res) => {
    try {
        const index = req.params.key
        const todolist = req.user.todolist
        todolist.splice(index, 1)
        const result = await req.db.collection(todos).updateOne({ _id: req.user._id }, { $set: { 'todolist': todolist } })
        if (result.modifiedCount == 1) {
            res.json({ succes: 'One item deleted succesfully' })
        } else { res.json({ message: 'Item not found' }) }
    } catch (error) {
        res.status(500).json(error.toString())
        console.log(error)
    }
}
module.exports = { getListController, postListController, deleteListController, editListController }