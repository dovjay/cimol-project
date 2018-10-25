const Model = require('../models/index')

class Controller {

    //Home
    static toHome(req, res) {
        Model.Service.findAll()
            .then(data => {
                res.render('pages', {data})
            })
    }

    //USER
    static addUser(req, res) {
        res.render('pages/sign_up_user', {})
    }
    static postAddUser(req, res) {
        let user = new Model.User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        user.save()
            .then((data) => {
                res.redirect('/')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static renderReadUser(req, res) {
        Model.User.findAll()
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static renderUpdateUser(req, res) {
        Model.User.findById(req.params.id)
            .then((data) => {
                res.render('user/update', { data: data })
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static postUpdateUser(req, res) {
        Model.User.update({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }, {
                where: {
                    id: req.params.id
                }
            })
            .then((data) => {
                res.send('success')
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static loginUser(req, res) {
        res.render('pages/login_user')
    }
    static postLoginUser(req,res){
        Model.User.findOne({
            where:{
                username: req.body.username
            }
        })
        .then((data)=>{
            if (req.body.username == data.username && req.body.password == data.password){
                req.session.role = 'user'
                req.session.idUser = data.dataValues.id
                console.log(req.session)
                res.redirect('/')
            }else{
                res.send('Wrong Password')
            }
        })
        .catch((err)=>{
            res.send(' wrong username')
        })
    }
    // SERVICE
    static renderAddService(req, res) {
        res.render('service/add')
    }
    static postAddService(req, res) {
        let service = new Model.Service({
            name: req.body.name,
            cost: req.body.price,
            estimate: req.body.estimate
        })
        service.save()
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    // WASHER
    static renderAddWasher(req,res){
        res.render('pages/sign_up_washer')
    }
    static postAddWasher(req,res){
        let washer = new Model.Washer({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        washer.save()
            .then((data)=>{
                res.send(data)
            })
            .catch((err)=>{
                res.send(err)
            })
    }
    static loginWasher(req, res) {
        res.render('pages/login_washer')
    }
    static sessionLoginWasher(req, res) {
        let username = req.body.username
        let password = req.body.password
        req.session.role = 'washer'
        console.log(req.session)
        res.redirect('/')
    }

    //Transaction
    static renderTransaction(req,res){
        let result = []
        // for (let i=0; i<req.body.length; i++){
        //     let obj = {}
        //     obj.UserId = req.session.idUser
        //     obj.ServiceId= req.body[i].
        // }
        res.send(req.body)
    }
}

module.exports = Controller