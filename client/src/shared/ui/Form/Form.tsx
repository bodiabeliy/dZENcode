import {classNames} from "shared/lib/classNames/classNames";
import {ButtonHTMLAttributes, FC, useState} from "react";

import Form from "react-bootstrap/esm/Form";

import { Button } from "../Button/Button";
import { useTranslation } from "react-i18next";
import { Col } from "react-bootstrap";

export enum ThemeForm {
    CLEAR = 'clear',
}

interface FormProps {
    className?: string;
    theme?: ThemeForm;
    formName:string;
    formNameGroups:FormGroup[];
}

interface FormGroup {
    FieldLabel: string;
    FieldType: string;
    FieldPlaceholder:string;
    FieldValue:string;
    FieldChange:((data:any) =>void)
    FieldIsValid:boolean

}

export const FormContainer: FC<FormProps> = (props) => {
    const {formName, formNameGroups }= props


    const handleSubmit = (e:any) => {
     e.preventDefault()
     const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    } else {
      alert('Thank you for your feedback!')
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
    <Form>
    <h1>{formName}</h1>
    {formNameGroups.map((fieldGroup:FormGroup, index) => {
        console.log("fieldGroup", fieldGroup);
        
        return (
        <Form.Group as={Col} md={"12px"} controlId="validationCustom01">
            <Form.Label>{fieldGroup.FieldLabel}</Form.Label>
            <Form.Control
                required
                type={fieldGroup.FieldType}
                placeholder={fieldGroup.FieldPlaceholder}
                value={fieldGroup.FieldValue}
                onChange={e => fieldGroup.FieldChange( e.target.value) }
                isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>
        )
    })}
      <Button onClick={(e) => handleSubmit(e)} type="submit">Submit form</Button>
</Form>
   )
};

