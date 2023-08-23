class UserService {
    async UserRegistration (request, responce )  {
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
    }

}
    
module.exports = new UserService()