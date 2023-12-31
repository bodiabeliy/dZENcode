const config  = require("config")
const fs = require("fs")
const jwt = require("jsonwebtoken")


class UserController {

    // сохраняeм данные о пользователе в токен доступа
    async getUserToken (request, response, next) {
        if (request.methods === "OPTOIONS") {
            next()
        }
    
        try {
           const token = request.headers.authorization.split(' ')[1]
            if(!token) {
               console.log("Authorization failed!");
            }
            const decoded = jwt.verify(token, config.get("secretKey"))
            request.user = decoded
            next()
        } catch (error) {
            return response.status(400).json({message: request.user})
        }
    }
   
}

module.exports = new UserController()