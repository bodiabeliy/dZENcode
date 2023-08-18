import { FC, useState, useCallback, useEffect, memo } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, UserEmailSelector } from "app/providers/storeProvider/reducers/UserlSlice"

import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/esm/Form";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button/Button";

import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LoginForm.module.scss"

interface LoginFormProps {
    formType?:string
}



export const LoginForm:FC<LoginFormProps> = memo(({formType}) => {
    const { t, i18n } = useTranslation();
    const count = useSelector(UserEmailSelector)
    const dispatch = useDispatch()

    const handleSubmit = (e:any) => {
     e.preventDefault()

     //@ts-ignore
     dispatch(registerUser(form.username, form.userpassword))
     const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
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
      if ( !username || username === '' ) newErrors.username = 'User name!'
      if ( userpassword.length <8 ) newErrors.userpassword = 'password must be more than 8!'
     
  
      return newErrors
  }

    return ( 
    <>
      {
        formType =="registrationForm" ?
        // <FormContainer 
        //   formName={t("formName")} 
        //   formNameGroups={[
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
          <h1>{t("formName")}</h1>
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
        <h1>Авторизация</h1>
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
      onClick={(e) => handleSubmit(e)} type="submit">Submit form</Button>
    </Form>
        :null
    }


    </> 
    );
})
 
