module.exports = function(req,res,next){

    if (req.session.role === 'user'){
        next()
    }else if(req.session.role == null){
        res.redirect('/user/login')
    }else{
        res.send('anda tidak memiliki akses')
    }
}
