const Model = require('../models/index')
const crypto = require('crypto')
const passwordHash = require('../helpers/passwordHash')

class Controller {

    //Home
    static toHome(req, res) {
        let sessionRole = req.session.role
        let name = req.session.name
        if (sessionRole) {
            if (sessionRole == 'user') {
                Model.Service.findAll()
                    .then(data => {
                        res.render('pages', { data, sessionRole, name })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            } else {
                let data = null
                res.render('pages', { data, sessionRole, name })
            }
        } else {
            let name = null
            Model.Service.findAll()
                    .then(data => {
                        res.render('pages', { data, sessionRole, name })
                    })
                    .catch(err => {
                        res.send(err)
                    })
        }        
    }
    
    // logout pleassseee
    static logout(req, res) {
        req.session.role = null
        req.session.identifier = null
        res.redirect('/')
    }

    //USER
    static addUser(req, res) {
        res.render('pages/sign_up_user')
    }
    static postAddUser(req, res) {
        let pass = passwordHash(req.body.password)
        let user = new Model.User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: pass.password,
            salt: pass.salt // baru
        })
        user.save()
            .then((user) => {
                req.session.role = 'user'
                req.session.userEmail = user.email
                req.session.identifier = user.id
                req.session.name = user.firstName + " " + user.lastName
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
        let error
        res.render('pages/login_user', { error })
    }
    static postLoginUser(req, res) {
        let username = req.body.username
        Model.User.findOne({ where: { username: username } })
            .then(data => {
                let pass = passwordHash(req.body.password, data.salt)
                if (data) {
                    if (pass.password == data.password) {
                        req.session.role = 'user'
                        req.session.userEmail = data.dataValues.email
                        req.session.name = data.firstName + " " + data.lastName
                        req.session.identifier = data.dataValues.id
                        console.log(req.session)
                        res.redirect('/')   
                    } else {
                        let error = 'username atau password salah!'
                        res.render('pages/login_user', { error })    
                    }
                } else {
                    let error = 'username atau password salah!'
                    res.render('pages/login_user', { error })
                }
            })
            .catch(err => {
                let error = 'username atau password salah!'
                res.render('pages/login_user', { error })
            })
    }
    static renderUserOrder(req, res) {
        Model.User.findById(req.session.identifier, {
            include: Model.Service
        })
            .then((data) => {
                if (!data.Services[0].Transaction) {
                    res.send('Anda belum melakukan order apapun, silahkan pilih servis kami terlebih dahulu')
                } else {
                    res.render('pages/order_list_user', { data: data })
                }
                // res.send(data)
            })
            .catch((err) => {
                res.send('anda belum melakukan order apapun')
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
    static renderAddWasher(req, res) {
        res.render('pages/sign_up_washer')
    }
    static postAddWasher(req, res) {
        let pass = passwordHash(req.body.password)
        let washer = new Model.Washer({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: pass.password,
            salt: pass.salt // baru
        })
        washer.save()
            .then((washer) => {
                req.session.role = 'washer'
                req.session.identifier = washer.id
                req.session.userEmail = washer.email
                req.session.name = washer.firstName + " " + washer.lastName
                res.redirect('/')
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static loginWasher(req, res) {
        let error
        res.render('pages/login_washer', { error })
    }
    static sessionLoginWasher(req, res) {
        let username = req.body.username
        Model.Washer.findOne({ where: { username: username } })
            .then(data => {
                let pass = passwordHash(req.body.password, data.salt)
                if (data) {
                    if (pass.password == data.password) {
                        req.session.role = 'washer'
                        req.session.identifier = data.dataValues.id
                        req.session.userEmail = data.dataValues.email
                        req.session.name = data.firstName + " " + data.lastName
                        console.log(req.session)
                        res.redirect('/')   
                    } else {
                        let error = 'username atau password salah!'
                        res.render('pages/login_washer', { error })    
                    }
                } else {
                    let error = 'username atau password salah!'
                    res.render('pages/login_washer', { error })
                }
            })
            .catch(err => {
                let error = 'username atau password salah!'
                res.render('pages/login_washer', { error })
            })
    }
    static getWasherOrderList(req, res) {
        Model.User.findAll({
            include: [{
                model: Model.Service,
                through: {
                    where: { complete: 0 }
                }
            }]
        })
            .then(data => {
                res.render('pages/order_list_washer', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static acceptOrder(req, res) {
        let id = req.params.userId
        Model.Transaction.update({
            WasherId: req.session.identifier
        }, {
            where: { UserId: id }
        })
            .then((data) => {
                res.redirect('/washer/workstart')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static workstart(req, res) {
        res.render('pages/workstart')
    }
    static workdone(req, res) {
        res.render('pages/workdone')
    }
    static completework(req, res) {
        let id = req.session.identifier
        Model.Transaction.update(
            { complete: 1 },
            {where: {WasherId: id}
        })
            .then(data => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }


    //Transaction
    static renderTransaction(req, res) {


        if (req.body.order == undefined) {
            res.send('silahkan masukan pesanan yang anda inginkan')
        } else {
            if (req.body.order.length == 1) {
                Model.Transaction.create({
                    UserId: req.session.identifier,
                    ServiceId: Number(req.body.order),
                    WasherId: null,
                    location: req.body.location
                })
                    .then((data) => {
                        Model.User.findById(req.session.identifier, {
                            include: Model.Service
                        })
                            .then((services) => {
                                res.render('pages/user_confirmation', { data: services, email: req.session.userEmail })
                                // res.send(services)
                            })
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            } else {
                let result = []
                for (let i = 0; i < req.body.order.length; i++) {
                    let obj = {}
                    obj.UserId = Number(req.session.identifier)
                    obj.ServiceId = Number(req.body.order[i])
                    obj.WasherId = null,
                        obj.location = req.body.location
                    result.push(obj)
                }
                Model.Transaction.bulkCreate(result)
                    .then((data) => {
                        Model.User.findById(req.session.identifier, {
                            include: Model.Service
                        })
                            .then((services) => {
                                res.render('pages/user_confirmation', { data: services, email: req.session.userEmail })
                            })
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            }
        }
    }

    static deleteOrder(req, res) {
        // res.send(req.session.email)
        Model.Transaction.destroy({
            where: {
                ServiceId: req.params.id,
                UserId: req.session.identifier
            }
        })
            .then((data) => {
                Model.User.findById(req.session.identifier, {
                    include: Model.Service
                })
                    .then((data) => {
                        res.render('pages/user_confirmation', { data: data, email: req.session.userEmail })
                    })

                // res.send('success')
            })
            .catch((err) => {
                res.semd(err)
            })
    }

    static cancelOrder(req, res) {
        Model.Transaction.destroy({
            where: {
                UserId: req.session.identifier
            }
        })
            .then((data) => {
                res.redirect('/')
            })
    }
}

module.exports = Controller