import React, { useContext } from 'react'
import s from './Header.module.scss'
import { AuthContext } from '../../context/AuthContext';

const Header = () => {

    const { logout, isLogin, name } = useContext(AuthContext)

    return (
        <header className={s.header}>
            <div className={`${s.in_header} container`}>
                {
                    isLogin
                        ? <h2>{name}</h2>
                        : <h2>To Do List</h2>
                }
                {
                    isLogin
                        ? <button className={s.btn} onClick={logout}>Выйти</button>
                        : ''
                }
            </div>
        </header>
    );
};
export default Header