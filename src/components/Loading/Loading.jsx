import React from 'react'
import s from './Loading.module.css'

const Loading = () => {
    return (
        <div className={s.bg}>
            <span className={s.loader}></span>
        </div>
    );
};
export default Loading