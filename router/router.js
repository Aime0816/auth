const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';
const { registerUser, dashboard } = require('../controller/userController');
const passportConfig = require('../config/passport');
passportConfig();
router.post('/insertuser', registerUser);


router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return next(err);
    }

    if (!user) {
      console.log("Authentication failed:", info?.message);
      return res.status(401).json({
        error: info?.message || "Authentication failed",
      });
    }
const token = jwt.sign({
  id:user.id,
  username:user.username
},JWT_SECRET,{expiresIn:'1h'});
res.cookie('token',token,{
  httpOnly:true,
  maxAge:3600000
})
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }

      console.log("User logged in successfully   " +  token);
      return res.json({ message: "Login successful" + token, user });
    });
  })(req, res, next); 
});

const authenticateToken = (req,res,next)=>{
  const token = req.cookies.token;
  if(!token){
    console.log("No token found");
    return res.redirect('/login.html');
  }
  jwt.verify(token,JWT_SECRET,(err,user)=>{
    if(err){
      console.error("Token verification error:", err);
      return res.redirect('/login.html');
    }
    req.user = user;
    next();
 
  });
}
router.get('/auth/google',
passport.authenticate('google',{scope:['profile']})
);
router.get('/auth/google/callback',
passport.authenticate('google',{failureRedirect:'/login.html'}),
(req,res)=>{
  const token = jwt.sign({
    id:req.user.id,
    username:req.user.username
  },JWT_SECRET,{expiresIn:'1h'});
  res.cookie('token',token,{
    httpOnly:true,
    maxAge:3600000
  })
  res.redirect('/dashboard');
}
);
router.get('/dashboard',authenticateToken, dashboard);
module.exports = router;

