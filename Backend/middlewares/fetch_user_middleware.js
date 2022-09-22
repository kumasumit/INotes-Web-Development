var jwt = require('jsonwebtoken');

const JWT_TOKEN = "sumitisagoo$dby";
const fetchUser = function (req, res, next){
//get the user from the jwt token and add id to the req object
const token = req.header('auth-token');
if(!token){
    //if there is no token
    return res.status(401).send({error: "Please authenticate using valid token"});
}
try{
//if token exists, verify and get the user from jwt.verify
const data = jwt.verify(token, JWT_TOKEN);
//copy the verified user into the req.user
req.user = data.user;
next();
}catch(error){
    // console.log(error);
    return res.status(401).send({error: "Please authenticate using valid token"});
}

}

module.exports = fetchUser;