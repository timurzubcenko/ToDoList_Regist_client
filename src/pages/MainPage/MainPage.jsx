import React, { useState, useContext, useEffect, useCallback } from 'react'
import s from './MainPage.module.scss'
import Task from '../../components/Task/Task';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';

const API_URL = process.env.REACT_APP_API_URL

const MainPage = () => {

    const { userId } = useContext(AuthContext)

    const [input, setInput] = useState('')
    const [tasks, setTasks] = useState(null)

    const getTasks = useCallback(async () => {
        try {
            await axios.get(API_URL + '/api/tasks/', { params: { userId } })
                .then((res) => {
                    setTasks(res.data)
                })
        }
        catch (err) {
            console.log(err)
        }
    }, [userId])

    // const post = {login: userId, description: input, done: false,}

    const onChange = (event) => {
        setInput(event.target.value)
    }

    const addTask = useCallback(async () => {
        await axios.post(API_URL + '/api/tasks/add', { login: userId, description: input, done: false, })
            .then(res => {
                setTasks([...tasks, res.data])
                setInput('')
                getTasks()
            })
            .catch(err => {
                console.log(err)
            })
    }, [input, userId, tasks, getTasks])

    const enterPressed = (e) => {
        if (e.keyCode === 13) {
            addTask()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', enterPressed)
        return () => {
            document.removeEventListener('keydown', enterPressed)
        }
    })

    const removeTask = useCallback(async (id) => {
        try {
            await axios.delete(API_URL + '/api/tasks/delete/' + id, { id })
                .then(() => {
                    getTasks()
                })
        }
        catch (err) {
            console.log(err)
        }
    }, [getTasks])

    const doneTask = useCallback(async (id) => {
        try {
            await axios.put(API_URL + '/api/tasks/done/' + id, { id })
                .then(() => {
                    getTasks()
                })

        } catch (error) {
            console.log(error)
        }
    }, [getTasks])

    useEffect(() => {
        setTimeout(() => {
            getTasks()
        }, 1000)
    }, [getTasks])

    if (tasks === null) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <div className={`${s.main} container`}>
                <div className={s.inputs_and_btn}>
                    <input
                        value={input}
                        onChange={onChange}
                        placeholder='Задание'
                        type="text" />
                    <button onClick={addTask} className={s.btn}>Отправить</button>
                </div>
                <div className={s.tasks}>
                    {
                        tasks.length !== 0
                            ? tasks.map((task, index) =>
                                <Task
                                    index={index}
                                    doneTask={doneTask}
                                    removeTask={removeTask}
                                    key={index} task={task} />)
                            : <h2>Заданий нет</h2>
                    }
                </div>
            </div >
        </>
    );
};
export default MainPage