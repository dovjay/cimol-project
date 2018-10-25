const Model = require('../models/index')

class Controller {

    //Home
    static toHome(req, res) {
        let sessionRole = req.session.role
        Model.Service.findAll()
            .then(data => {
                let sessionRole = req.session.role
                res.render('pages', {data, sessionRole})
            })
    }
    static logout(req, res) {
        req.session.role = undefined
        res.redirect('/')
    }

    // logout pleassseee
    static logout(req, res) {
        req.session.role = null
        res.redirect('/')
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
        let err
        res.render('pages/login_user', {err})
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
                req.session.identifier = data.dataValues.id
                console.log(req.session)
                res.redirect('/')
            }else{
                let err = 'username atau password salah!'
                res.render('pages/login_user', {err})
            }
        })
        .catch((err)=>{
            res.send(err)
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
        let err
        res.render('pages/login_washer', {err})
    }
    static sessionLoginWasher(req, res) {
        let username = req.body.username
        let password = req.body.password
        Model.Washer.find({where: {username: username, password: password}})
            .then(data => {
                if (data) {
                    req.session.role = 'washer'
                    req.session.identifier = data.dataValues.id
                    res.redirect('/')
                } else {
                    let err = 'username atau password salah!'
                    res.render('pages/login_washer', {err})
                }
            })
            .catch(err => {
                res.send('login gagal')
            })
    }
    static getWasherOrderList(req, res) {
        Model.User.findAll({
            include: [{
                model: Model.Service,
                through: {
                    where: {complete: 0}
                }
            }]
        })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    //Transaction
    static renderTransaction(req,res){
       
        let result = []
        for (let i=0; i<req.body.order.length; i++){
            let obj = {}
            obj.UserId = req.session.idUser
            obj.ServiceId= Number(req.body.order[i])
            obj.WasherId = null
            result.push(obj)
        }
        // res.send(result)
        Model.Transaction.bulkCreate(result)
            .then((data)=>{
                res.send(result)
            })
            .catch((err)=>{
                res.send(err)
            })
    }
}

module.exports = Controller