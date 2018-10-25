const router = require ('express').Router()
const Controller = require('../controller/index')

// Crud user
//create
router.get('/user/add', Controller.addUser)
router.post('/user/add', Controller.postAddUser)
//read
router.get('/user/read', Controller.renderReadUser)
//update
router.get('/user/update/:id', Controller.renderUpdateUser)
router.post('/user/update/:id', Controller.postUpdateUser)
//delete

//Crud Service
// Create
router.get('/service/add', Controller.renderAddService)
router.post('/service/add', Controller.postAddService)

//Crud Washer
//Create
router.get('/washer/add', Controller.renderAddWasher)
router.post('/washer/add', Controller.postAddWasher)
//Read




module.exports = router