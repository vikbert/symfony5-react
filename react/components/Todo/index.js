import React, {useEffect, useState} from 'react';
import styles from './todo.css';

const Todo = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URI}/todos`)
            .then(response => response.json())
            .then(data => setTodos(data));
    }, []);

    return (<>
        <div className={styles.todoapp}>
            <header className={styles.header}>
                <h1>React Todo</h1>
                <section className={styles.main}>
                    <ul className={styles['todo-list']}>
                        {todos.map((todo, index) => (<>
                            <li key={index}>
                                <div className={styles.view}>
                                    <input type="checkbox" className={styles.toggle}/>
                                    <label>{todo.title}</label>
                                    <button className={styles.destroy}></button>
                                </div>
                            </li>
                        </>))}
                    </ul>
                </section>
            </header>
        </div>
    </>);
};

export default Todo;
