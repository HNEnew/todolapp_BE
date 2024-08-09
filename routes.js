const express = require('express')
const router = express.Router()

const { getListController, postListController, deleteListController ,editListController} = require('./middlewares/listcontrollers')


router.get('/api/todoApp/getList', getListController)
router.post('/api/todoApp/postList', postListController)
router.delete('/api/todoApp/deleteList/:id', deleteListController)
router.post('/api/todoApp/editList',editListController)



module.exports = router