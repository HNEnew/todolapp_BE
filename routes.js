const express = require('express')
const router = express.Router()

const { getListController, postListController, deleteListController, editListController } = require('./middlewares/todolistControllers')
const { signupController, loginController,logoutController } = require('./middlewares/userControllers')
const { authenticateToken } = require('./middlewares/token/token')

router.get('/api/todoApp/getList', authenticateToken,  getListController)
router.post('/api/todoApp/postList', authenticateToken, postListController)
router.delete('/api/todoApp/deleteList/:key', authenticateToken, deleteListController)
router.post('/api/todoApp/editList', authenticateToken, editListController)

router.post('/api/todoapp/signup', signupController)
router.post('/api/todoApp/login', loginController)
router.get('/api/todoApp/logout', logoutController)



module.exports = router