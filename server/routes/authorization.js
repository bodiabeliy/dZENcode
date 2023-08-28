const Router = require("express");
const config  = require("config")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")

const userController = require("../controllers/UserController")


const authRouter = new Router()


// регистрация пользователя
authRouter.post('/registration', 

// проверка валидации папроля и почты на валидность
[
    check("email", "Email is uncorrect!").isEmail(),
    check("password", "Password is uncorrect! (Length must be in range from 3 to 12 symbols)").isLength({min:3, max:12})
],
async (request, responce ) => {
    try {
        const errors = validationResult(request)

        //получаем данные из тела запроса
        const {email, password} = request.body

        // проверка наличия ошибок в запросе

        if (!errors.isEmpty()) {
            return responce.status(400).json({massege: `Uncorrect request: ${errors}`})
        }

        const person = await User.findOne({email}) // есть ли пользователь по ключу email
        
        if (person) {
            return responce.status(400).json({massege: `user with ${email} already exist!`})
        }
        const  passwordHash = await bcrypt.hash(password, 7)
        const createUser = new User({email, password:passwordHash})
        await createUser.save()

         // создаем для пользователя папку под файлы

            return responce.json({massege: "User was creared successfully!"})
        
    } catch (error) {
        responce.send({message: `Creating error ${error}`})
    }
})
// авторизация пользователя
authRouter.post('/login', 
async (request, responce ) => {
    try {
        //получаем данные из тела запроса
        const {email, password} = request.body
        const user = await User.findOne({email})
        // есть ли пользователь (зарегистрирован или нет)
        if (!user) {
            return responce.status(404).json({message:"User not found"}) 

        }
        // проверка равности паролей
        const isPasswordSame = bcrypt.compareSync(password, user.password)
        if(!isPasswordSame) {
            return responce.status(400).json({message:"Password invalid!"}) 
        }
        const token = jwt.sign({id:user.id}, config.get("secretKey"), {expiresIn: "1h"})
        return responce.json({
            token,
            user: {
                id:user.id,
                email:user.email,
                diskSpace:user.diskSpace,
                userSpace:user.userSpace,
                avatar:user.avatar,
                files:user.files
            }
        })
    } catch (error) {
        responce.send({message: `Server error ${error}`})
    }
})

// jwt-токен пользователя
authRouter.get('/auth', userController.getUserToken,
async (request, responce ) => {
    try {
        const user = await User.findOne({_id:request.user.id})
        const token = jwt.sign({id:user.id}, config.get("secretKey"), {expiresIn: "1h"})
        return responce.json({
            token,
            user: {
                id:user.id,
                email:user.email,
                diskSpace:user.diskSpace,
                userSpace:user.userSpace,
                avatar:user.avatar,
                files:user.files
            }
        })
    } catch (error) {
        responce.send({message: `Server error ${error}`})
    }
})





// тестовые данные
const orders = [
    {
      id: 1,
      title: 'Order 1',
      date: '2017-06-29 12:09:33',
      description: 'desc',
      products:[
        {
            id: 1,
            serialNumber: 1234,
            isNew: 1,
            photo: 'pathToFile.jpg',
            title: 'Product 1',
            type: 'Monitors',
            specification: 'Specification 1',
            guarantee: {
              start: '2017-06-29 12:09:33',
              end: '2017-06-29 12:09:33'
            },
            price: [
              {value: 100, symbol: 'USD', isDefault: 0},
              {value: 2600, symbol: 'UAH', isDefault: 1}
            ],
            order: 1,
            date: '2017-06-29 12:09:33'
          },
          {
            id: 2,
            serialNumber: 2345,
            isNew: 0,
            photo: 'pathToFile.jpg',
            title: 'Product 1.2',
            type: 'Monitors',
            specification: 'Specification 1',
            guarantee: {
              start: '2017-06-29 12:09:33',
              end: '2017-06-29 12:09:33'
            },
            price: [
              {value: 100, symbol: 'USD', isDefault: 0},
              {value: 2600, symbol: 'UAH', isDefault: 1}
            ],
            order: 1,
            date: '2017-06-29 12:09:33'
          }
      ]
      
    },
    {
      id: 2,
      title: 'Order 2',
      date: '2017-06-29 12:09:33',
      description: 'desc',
      products:[
        {
            id: 2,
            serialNumber: 1234,
            isNew: 1,
            photo: 'pathToFile.jpg',
            title: 'Product 2',
            type: 'Monitors',
            specification: 'Specification 1',
            guarantee: {
              start: '2017-06-29 12:09:33',
              end: '2017-06-29 12:09:33'
            },
            price: [
              {value: 100, symbol: 'USD', isDefault: 0},
              {value: 2600, symbol: 'UAH', isDefault: 1}
            ],
            order: 2,
            date: '2017-06-29 12:09:33'
          }
      ]
    },
    {
      id: 3,
      title: 'Order 3',
      date: '2017-06-29 12:09:33',
      description: 'desc',
      products:[]
    }
  ];

  authRouter.get('/orders', async (req, res) => {
    res.json(orders);
  });


//
  const enTranslation =
  {
    "MainPage": "Main page",
    "RegisterLink": "Registration",
    "LoginLink": "Login",
    "LogoutLink":"Logout",
    "Languages": "English",
    "Orders":"Orders",
    "Products":"Products",
    "registrationFormName":"Registration",
    "authorizationFormName": "Authorization",
  
    "userName":"Login",
    "userPassword":"Password",
    "Logout":"Logout",
    "currentSession":"User",
    "countSession":"sesstion count"
  }
  
  authRouter.get('/en/translation', async (req, res) => {
    res.json(enTranslation);
  });




module.exports = authRouter