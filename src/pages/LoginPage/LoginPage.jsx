import React, { useState, useContext } from 'react'
import s from './LoginPage.module.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL

const LoginPage = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        login: '',
        password: '',
    })

    const [error, setError] = useState('')

    const { login } = useContext(AuthContext)

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async () => {
        try {
            await axios.post(API_URL + '/api/auth/login', user)
                .then((res) => {
                    console.log(res.data)
                    login(res.data.token, res.data.name, res.data.userId,)
                    navigate('/')
                })
        }
        catch (err) {
            setError(err.response.data.msg)
            console.log(err.response.data.msg)
        }
    }

    return (
        <div className={s.main}>
            <div className={s.window}>
                <h2>Авторизация</h2>
                <div className={s.inputs}>
                    <input
                        placeholder='Введите login:'
                        onChange={onChange}
                        value={user.login}
                        name='login' type="text" />
                    <input
                        placeholder='Введите пароль:'
                        onChange={onChange}
                        value={user.password}
                        name='password'
                        type="password" />
                </div>
                <h3 className={s.error}>
                    {error}
                </h3>
                <div className={s.navigate_btns}>
                    <Link className={s.link} to='/register'>Нет аккаунта?</Link>
                    <button className={s.btn} onClick={onSubmit} >Войти</button>
                </div>
            </div>
        </div>
    );
};
export default LoginPage
