import { Button, Input, Form } from "antd";
import { FC, useState, useCallback, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {Modal} from "shared/ui/Modal/Modal"
import ConfirmationIcon from "shared/assets/Confirmation.svg"
import KeyIcon from "shared/assets/Key.svg"


import cls from "./LoginForm.module.scss"
import { classNames } from "shared/lib/helpers/classNames";
import { 
    IsLoginUserSelector,
    UserEmailSelector, 
    UserPasswordSelector, 
    registerUser,
    loginUser, 
    activateUser,
    setUserEmail, 
    setUserPassword, 
    isAuthUserSelector
} from "entities/User/services/UserSlice";
import { useNavigate } from "react-router-dom";
interface LoginFormProps {
    formType:string
}

export const LoginForm:FC<LoginFormProps> = memo(({formType}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [isLoginModal, setIsLoginModal] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisibleVisible] = useState(false);
    const [passwordIsEqual, setPasswordIsEqual] = useState(false)
    const [isCode, setIsCode] = useState(false)
    const [confirmationCode, setConfirmationCode] = useState("")

    const dispatch = useDispatch();
    const email = useSelector(UserEmailSelector)
    const password = useSelector(UserPasswordSelector)
    const isLoginUser = useSelector(IsLoginUserSelector)
    const isAuthorization = useSelector(isAuthUserSelector);

    
   const RegistrateUserEmail =useCallback((email:string) => {
    dispatch(setUserEmail(email))
   }, [dispatch, email])

   const RegistrateUserPassword =useCallback((password:string) => {
    dispatch(setUserPassword(password))
   }, [dispatch, password])

   const Submit = useCallback(() => {
    //@ts-ignore
    dispatch(registerUser(email, password))
    onCloseModal()
   }, [dispatch, email, password, isLoginUser])

   const Login = useCallback(() => {
        //@ts-ignore
        dispatch(loginUser(email, password))
        navigate("/userProfile")

   }, [dispatch, email, password, isAuthorization])

   const UserEmailActivation = useCallback(() => {
    //@ts-ignore
    dispatch(activateUser())
    onCloseModal()
   }, [dispatch])
   

    const onCloseModal = useCallback(() => {
        setIsLoginModal((prev) => !prev);
    }, [isLoginModal]);

    const confirmEmail = (code:string) => {
        
        setConfirmationCode(prev => prev) 
        if (code.length ==6) {
            setIsCode(!isCode)
        }
        else setIsCode(false)
        console.log("confirmationCode", confirmationCode);
        
    }
    
       

    return ( 
    <>
        {
        formType =="registration" ?
        <Form
            form={form}
            name="register"
            scrollToFirstError
        >
            <div className={cls.registrationFields}>
                <p>Email</p>
                <Form.Item
                    name="email"
                    rules={[
                    {
                        type: 'email',
                        message: 'x Не верный формат почты!',
                    },
                    {
                        required: true,
                        message: 'Поле email не должно быть пустым!'
                    },
                    
                    ]}
                >
                    <Input
                            className={classNames("registrationEmail", {}, [cls.formInput,])}
                            placeholder="Адресс почты" 
                            onChange={(e) => RegistrateUserEmail(e.target.value)}
                            value={email}
                        />
                </Form.Item>
                    
                <p>Придумайте пароль</p>
                
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Поле пароля не должно быть пустым!',
                    },
                    {
                        pattern:/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/,
                        message: `Буквенная часть пароля должна содержать как строчные, так и прописные (заглавные) буквы`
                    },
                    { min: 8, message: 'Длина пароля должна быть не менее 8 символов!' },
                    { max: 14, message: 'Длина пароля должна быть более 14 символов!' },

                    ]}
                    hasFeedback
                >
                    <Input.Password
                        className={classNames("registrationPassword", {}, [cls.formInput])}
                        placeholder="Придумайте пароль"
                        suffix={<KeyIcon />}
                        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        onChange={(e) => RegistrateUserPassword(e.target.value)}
                        value={password}
                    />
                </Form.Item>
                   
                <p>Повторите пароль</p>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Поле пароля не должно быть пустым!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            setPasswordIsEqual(true)
                            return Promise.resolve();
                        }
                        setPasswordIsEqual(false)
                        return Promise.reject(new Error('Пароли не совпадают!'));
                        },
                    })
                    ]}
                >
                    <Input.Password
                        className={classNames("registrationConfirmPassword", {}, [cls.formInput])}
                        placeholder="Повторите пароль"
                        suffix={<KeyIcon />}
                        visibilityToggle={{ visible: confirmPasswordVisible, onVisibleChange: setConfirmPasswordVisibleVisible }}
                        value={password}

                    />
                </Form.Item>
                    
                <Button
                    className={classNames("registrationButton", {}, [cls.submitButton])}
                    disabled={!passwordIsEqual}
                    onClick={() => Submit()}
                    >Зарегистрироватся
                </Button>
            </div>
         </Form>
        :formType =="login" ?
        
        <Form
            form={form}
            name="login"
            scrollToFirstError
        >
            <div className={cls.registrationFields}>
                <p>Email</p>
                <Form.Item
                    name="email"
                    rules={[
                    {
                        type: 'email',
                        message: 'x Не верный формат почты!',
                    },
                    {
                        required: true,
                        message: 'Поле email не должно быть пустым!'
                    },
                    ]}
                >
                    <Input
                            className={classNames("registrationEmail", {}, [cls.formInput])}
                            placeholder="Адресс почты" 
                            onChange={(e) => e.target.value}
                            value={email}
                        />
                </Form.Item>
                    
                <p>Введите пароль</p>
                
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Поле пароля не должно быть пустым!',
                        },
                        {
                            pattern:/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/,
                            message: `Буквенная часть пароля должна содержать как строчные, так и прописные (заглавные) буквы`
                        },
                        { min: 8, message: 'Длина пароля должна быть не менее 8 символов!' },
                        { max: 14, message: 'Длина пароля должна быть более 14 символов!' },
    
                        ]}
                    hasFeedback
                >
                    <Input.Password
                        className={classNames("registrationPassword", {}, [cls.formInput])}
                        placeholder="Введите пароль"
                        suffix={<KeyIcon />}
                        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        value={password}
                    />
                </Form.Item>
 
                <Button
                    className={classNames("registrationButton", {}, [cls.submitButton])}
                    onClick={() => Login()}
                    >Войти
                </Button>
            </div>
         </Form>        
        :formType =="emailConfirm"?
        <Form
        form={form}
        name="emailConfirm"
        className={classNames(cls.emailConfirm)}
        scrollToFirstError
    >
        <div className={cls.registrationFields}>
            <p>Подтверждение E-Mail </p>
            <span>
            Мы отправили SMS с 6-значным кодом подтверждения на почту: <b>{email}</b>
            </span>
            <Form.Item
                name="emailConfirm"
                label="SMS-код"
                rules={[
                    
                ]}
            >
                
            </Form.Item>
            <Input
                        className={classNames("registrationEmail", {}, [cls.formInput])}
                        placeholder="Укажите код" 
                        onChange={(e) => confirmEmail(e.target.value)}
                    />
            <Button
                className={classNames("emailConfirmation", {}, [cls.submitButton])}
                onClick={() => UserEmailActivation()}
                disabled={!isCode}
                >Потвердить
            </Button>
        </div>
     </Form>  
        :null}

        {
            isLoginUser == true && (
                <Modal isOpen={isLoginModal} onClose={() =>onCloseModal()} className="registrationModal">
                    <ConfirmationIcon className={cls.registrationConfirm}/>
                    {formType == "registration"?
                     <span>
                        Аккаунт был успешно зарегистрирован.<br />
                        На ваш E-Mail отправлено письмо с ссылкой для подтверждения
                    </span>:
                    formType == "emailConfirm"?
                    <span>
                    Поздравляем!Ваша почта.<br /> <b>{email}</b> была успешно активирована!
                    </span>
                    : null}
                   
            </Modal>
            )
        }
        
    </> 
    );
})
 
