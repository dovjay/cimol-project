const router = require ('express').Router()
const Controller = require('../controller/index')
const middleware = require('../middleware/index')

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
//login
router.get('/user/login', Controller.loginUser)
router.post('/user/login', Controller.postLoginUser)
//order
router.get('/user/order/list', Controller.renderUserOrder)

//Crud Service
// Create
router.get('/service/add', Controller.renderAddService)
router.post('/service/add', Controller.postAddService)

//Crud Washer
//Create
router.get('/washer/add', Controller.renderAddWasher)
router.post('/washer/add', Controller.postAddWasher)

//Read
router.get('/washer/order/list/', Controller.getWasherOrderList)
router.post('/washer/accept/:userId', Controller.acceptOrder)

//Work
router.get('/washer/workstart', Controller.workstart)
router.get('/washer/workdone', Controller.workdone)
router.get('washer/complete', Controller.completework)

//Login
router.get('/washer/login', Controller.loginWasher)
router.post('/washer/login', Controller.sessionLoginWasher)

//logout pleasseee
router.get('/logout', Controller.logout)

//Transaction
router.post('/transaction',middleware.User, Controller.renderTransaction)


// Logout Pleasssseee
router.get('/logout', Controller.logout)

module.exports = router