const router = require ('express').Router()
const Controller = require('../controller/index')

//home
router.get('/', Controller.toHome)

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

//login
router.get('/user/login', Controller.loginUser)

//Crud Service
// Create
router.get('/service/add', Controller.renderAddService)
router.post('/service/add', Controller.postAddService)

//Crud Washer
//Create
router.get('/washer/add', Controller.renderAddWasher)
router.post('/washer/add', Controller.postAddWasher)

//Read


//Login
router.get('/washer/login', Controller.loginWasher)
router.post('/washer/login', Controller.sessionLoginWasher)


// Logout Pleasssseee
router.get('/logout', Controller.logout)

module.exports = router