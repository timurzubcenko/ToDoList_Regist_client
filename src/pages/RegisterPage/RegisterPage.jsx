import React from 'react'
import s from './RegisterPage.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const RegisterPage = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        login: '',
        name: '',
        password: '',
    })

    const [error, setError] = useState('')

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async () => {
        console.log(user)
        try {
            await axios.post(API_URL + '/api/auth/registration', user)
                .then((res) => {
                    console.log(res.data)
                    navigate('/login')
                })
        }
        catch (err) {
            setError(err.response.data.msg)
            console.log(err)
        }
    }

    return (
        <div className={s.main}>
            <div className={s.window}>
                <h2>Регистрация</h2>
                <div className={s.inputs}>
                    <input
                        placeholder='Придумайте login:'
                        onChange={onChange}
                        value={user.login}
                        name='login' type="text" />
                    <input
                        placeholder='Введите свое имя:'
                        onChange={onChange}
                        value={user.name}
                        name='name'
                        type="text" />
                    <input
                        placeholder='Придумайте пароль:'
                        onChange={onChange}
                        value={user.password}
                        name='password'
                        type="password" />
                </div>
                <h3 className={s.error}>
                    {error}
                </h3>
                <div className={s.navigate_btns}>
                    <Link className={s.link} to='/login'>Уже есть аккаунт?</Link>
                    <button className={s.btn} onClick={onSubmit} >Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
};
export default RegisterPage
