const User = require('../models/user.models')
const jwt = require('jsonwebtoken');
// const config = require('../../config/config')

const jwtSecret ="YOUR_secret_key";


const signin = async(req,res) =>{
    try {
        
        let user = await User.findOne({ "email": req.body.email })
        if (!user){
            return res.status('401').json({ error: "User not found" })
        }
        if (!user.authenticate(req.body.password)) {
            return res.status('401').send({ error: "Email and password don't match." })
        }
        const token = jwt.sign({ _id: user._id }, jwtSecret)
        
        res.cookie('t', token, { expire: new Date() + 9999 })
        
        return res.json({
            token,
            user: {
            _id: user._id,
            name: user.name,
            email: user.email
            }
        })

    } catch (error) {
        
    }
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
    message: "signed out"
    })
   }
   
const requriesignin = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader.slice(6)
    
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, jwtSecret, (err, user) => {
           
      if (err) return res.sendStatus(403)
        
      req.user = user

      next()
    })
  }

const hasAuthorization = (req,res, next) =>{

    const authorized = req.profile && req.user && req.profile._id == req.user._id
    if(!authorized){
        return res.status('403').json({
            error:"User is not authorized"
        })
    }
    next()
}

module.exports = { signin, signout, requriesignin, hasAuthorization}