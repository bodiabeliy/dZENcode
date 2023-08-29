import { FC, useState, useCallback, useEffect, memo } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, loginUser, UserEmailSelector, userSessionCount } from "app/providers/storeProvider/reducers/UserSlice"

import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/esm/Form";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button/Button";

import cls from "./LoginForm.module.scss"

interface LoginFormProps {
    formType?:string
}



export const LoginForm:FC<LoginFormProps> = memo(({formType}) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()

    const handleSubmit = (e:any) => {
     e.preventDefault()

     
     const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    }
    if (formType =="registrationForm") {
      //@ts-ignore
      dispatch(registerUser(form.username, form.userpassword))
    }
    if (formType =="loginForm") {
      //@ts-ignore
      dispatch(loginUser(form.username, form.userpassword))
      
    }
    };
    
    const [ form, setForm ] = useState({
      username:"",
      userpassword:""

    })
    const [ errors, setErrors ] = useState<any>({
      username:"",
      userpassword:""
    })


    const setField = (field:any, value:any) => {
      
      setForm({...form, [field]: value })

      // Check and see if errors exist, and remove them from the error object:
      if ( !!errors[field] ) setErrors({
        ...errors,
        [field]: null
      })
      console.log({field, form});
      
      return {field, form}
    }

    const findFormErrors = () => {
      const { username, userpassword } = form
      const newErrors = {
        username:"",
        userpassword:""
      }
      const regexEmailExpression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;
      const regexPasswordExpresstion = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}/

      if (!regexEmailExpression.test(username))  newErrors.username = t("invalidEmailError") 
      if ( !username || username === '' ) newErrors.username = t("emptyEmailError")

      if (regexPasswordExpresstion.test(userpassword))  newErrors.userpassword = t("invalidPasswordError")
      if ( !userpassword || userpassword === '' ) newErrors.userpassword = t("emptyPasswordError")
     
  
      return newErrors
  }

    return ( 
    <>
      {
        formType =="registrationForm" ?
        // <FormContainer 
        //   registrationFormName={t("registrationFormName")} 
        //   registrationFormNameGroups={[
        //     {
        //       FieldLabel:"Login",
        //       FieldType:"email",
        //       FieldPlaceholder:"test@gmail.com",
        //       FieldValue:form.username,
        //       FieldChange:((e) => setForm({...form, username:e.target.value})),
        //       FieldIsValid:!!errors.username

        //     },
        //     {
        //       FieldLabel:"Password",
        //       FieldType:"password",
        //       FieldPlaceholder:"Dfgfbvv_2",
        //       FieldValue:form.userpassword,
        //       FieldChange:((e) => setField('userpassword', e.target.value)),
        //       FieldIsValid:!!errors.userpassword

        //     }
        //   ]}
        //  />
        <Form>
          <h1>{t("registrationFormName")}</h1>
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>{t("userName")}</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="test@gmail.com"
              value={form.username}
              onChange={e => setField('username', e.target.value) }
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Password correct!</Form.Control.Feedback>

          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <Form.Label>{t("userPassword")}</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Last name"
              value={form.userpassword}
              onChange={e => setField('userpassword', e.target.value) }
              isInvalid={!!errors.userpassword}

            />
            <Form.Control.Feedback type="invalid">{errors.userpassword}</Form.Control.Feedback>

            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
        <Button
        className={cls.submitBtn} 
        onClick={(e) => handleSubmit(e)} type="submit">Submit form</Button>
      </Form>
    :formType == "loginForm" ?
      <Form>
        <h1>{t("authorizationFormName")}</h1>
        <Form.Group as={Col} md="12" controlId="validationCustom04">
          <Form.Label>{t("userName")}</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="test@gmail.com"
            value={form.username}
            onChange={e => setField('username', e.target.value) }
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom02">
          <Form.Label>{t("userPassword")}</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Last name"
            value={form.userpassword}
            onChange={e => setField('userpassword', e.target.value) }
            isInvalid={!!errors.userpassword}

          />
          <Form.Control.Feedback type="invalid">{errors.userpassword}</Form.Control.Feedback>

          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
        </Form.Group>
      <Button
      className={cls.submitBtn} 
      onClick={(e) => handleSubmit(e)} type="submit">{t("LoginLink")}</Button>
    </Form>
        :null
    }


    </> 
    );
})
 
