const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const session = require('express-session')

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: 'apa nich',
    role: null,
    userEmail: null,
    identifier: null,
    name: null
}))

app.use(express.urlencoded({extended:false}))

app.use('', routes)

app.listen(port, function(){
    console.log('listening on port ' + port)
})