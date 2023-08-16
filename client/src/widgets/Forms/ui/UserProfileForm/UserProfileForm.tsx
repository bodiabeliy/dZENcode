import React , {useCallback, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserEmailSelector, isAuthUserSelector, logout } from 'entities/User/services/UserSlice';

import { Button, DatePicker, Form, Input, Space } from "antd";
import {Form  as FinalForm, Field } from "react-final-form";
import formatString from "format-string-by-pattern";

import ExitArrowIcon from 'shared/assets/ExitArrow.svg'
import cls from "./UserProfileForm.module.scss"
import { classNames } from 'shared/lib/helpers/classNames';
import { useNavigate } from 'react-router-dom';


const dateFormat = 'YYYY/MM/DD';
const mask = { name: "phone-3", parse: "+38 (AAAA) BBBBBB" }


export const UserProfileForm = () => {
    const email = useSelector(UserEmailSelector)
    const isAuthorization = useSelector(isAuthUserSelector);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));
    const onSubmit = async (values:any) => {
        await sleep(300);
      };
      

    const Logout =useCallback(() => {
        dispatch(logout())
        navigate(-1)
    }, [isAuthorization])

    return ( 
        <>
        {isAuthorization ?
                <>
                <Form
                    name="userProfile"
                    autoComplete="off"
                >
                <Space direction="vertical">
                        <p className={cls.userProfileFormTitle}>Профиль пользователя</p>
                        <div className={classNames(cls.mainRegistrationForm)}>
                            <div className={classNames(cls.userNameArea)}>
                            <div className="names">
                                <div className={classNames("", {}, ["surname"])}>
                                    <Form.Item
                                        label="Фамилия"
                                        name="username"
                                        rules={[{ required: true }]}
                                        >
                                    </Form.Item>
                                    <Input
                                        className={classNames("userNameArea", {}, [cls.formInput, cls.inline])}
                                        placeholder="Михаилов"
                                    />
                                </div>
                                </div>
                                <div className={classNames("", {}, ["тame"])}>
                                    <Form.Item
                                        label="Имя"
                                        name="name"
                                        rules={[{ required: true }]}
                                        >
                                    </Form.Item>
                                    <Input
                                        className={classNames("userNameArea", {}, [cls.formInput,  cls.inline])}
                                        placeholder="Михаил"
                                    />
                                </div>
                                <div className="">
                                    <div className={classNames("", {}, ["patronumic"])}>
                                        <Form.Item
                                            label="Отчество"
                                            name="patronumic"
                                            rules={[{ required: true }]}
                                            >
                                        </Form.Item>
                                        <Input
                                            className={classNames("userNameArea", {}, [cls.formInput,  cls.inline])}
                                            placeholder="Михаилович"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={classNames(cls.userAdditionalInfoArea)}>
                                <div className={classNames("", {}, ["bithday"])}>
                                    <Form.Item
                                        label="Дата рождения"
                                        name="bithday"
                                        rules={[{ required: true }]}
                                    >
                                    </Form.Item>
                                    <DatePicker 
                                    placeholder='10/08/1983'
                                        className={classNames("userNameArea", {}, [cls.formInput])}
                                        suffixIcon={null} 
                                        format={dateFormat} 
                                    />
                                </div>
                                <div className={classNames("", {}, ["phone"])}>
                                        <FinalForm 
                                        onSubmit={onSubmit}
                                        render={() => (
                                            <div className={classNames("", {}, ["phone-user"])}>
                                                <Form.Item
                                                    label="Телефон"
                                                    name="phone"
                                                    rules={[{ required: true }]}
                                                >
                                                </Form.Item>
                                                <Field
                                                    className={classNames("", {}, [cls.formInput, "ant-input css-dev-only-do-not-override-txh9fw"])}
                                                    component="input"
                                                    name={mask.name}
                                                    parse={formatString(mask.parse)}
                                                    placeholder={"+38 (050) 725 60 09"}
                                                
                                                />
                                            </div>
                                        )}
                                        >
                                    </FinalForm>
                                </div>
                               
                                <div className={classNames("", {}, ["email"])}>
                                    <Form.Item
                                        label="E-Mail"
                                        name="email"
                                        rules={[{ required: true }]}
                                        >
                                    </Form.Item>
                                    <Input
                                        className={classNames("userNameArea", {}, [cls.formInput])}
                                        disabled
                                        value={email}
                                    />
                                </div>
                        </div>
                        </div>
                    </Space>
                </Form>
                <div className={classNames(cls.formStepper)}>
                    <div className={classNames(cls.formStepper__content)}>
                    <Button  
                        className={classNames(cls.formStepper__btn, {}, [cls.prevBtn])} 
                        icon={<ExitArrowIcon />}
                        onClick={() => Logout()}
                    >
                        Выход
                    </Button>
                    <Button type="primary"  className={classNames(cls.formStepper__btn, {}, [cls.nextBtn])}
                        onClick={() => navigate("/activation")}
                    >
                        Далее
                    </Button>
                    </div>
                </div>
                </>
                
                :"Пользователь не авторизованый!"}

        </>
     );
}
 
