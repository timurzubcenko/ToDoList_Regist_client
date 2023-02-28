import React from 'react'
import s from './Task.module.scss'
import { Check2Circle, Trash } from 'react-bootstrap-icons'

const Task = ({ index, doneTask, task, removeTask }) => {

    let number = index + 1

    return (
        <div className={s.task}>
            <div className={s.text}>
                <p className={`${s.number} ${task.done ? s.done : ''}`}>{number}.</p>
                <p className={`${s.desc} ${task.done ? s.done : ''}`}>{task.description}</p>
            </div>
            <div className={s.btns}>
                <button onClick={() => doneTask(task._id)} className={s.btn}><Check2Circle /></button>
                <button onClick={() => removeTask(task._id)} className={`${s.btn} ${s.delete}`}><Trash /></button>
            </div>
        </div>
    );
};
export default Task