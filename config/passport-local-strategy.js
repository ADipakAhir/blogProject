const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../models/adminmodel');

passport.use(new LocalStrategy({
    usernameField : "email"
}, async function(email,password,done){
    let adminData = await Admin.findOne({email:email});
   
    if(adminData){
        if(adminData.password == password){
            return done(null,adminData);
        }
        else{
            return done(null,false);
        }
    }
    else{
        return done(null,false);
    }
}))

passport.serializeUser(function(user,done){
     return done(null,user.id)
})



passport.deserializeUser(async function(id,done){
    
    let AdminData = await Admin.findById(id);
    
    if(AdminData){
        return done(null,AdminData);
    }
    else{
        return done(null,false);
    }
})

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/admin/');
    }

}
passport.setAuthenticatedUser  = function(req,res,next){
    if(req.isAuthenticated()){
        // console.log(req.user);
        res.locals.adminData = req.user;
    }
    next();
}
module.exports = passport;

