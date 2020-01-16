import React, {useEffect} from 'react';
import {hot} from 'react-hot-loader';
import {getTodos} from "./http/Todos";

function App() {
    useEffect(() => {
        const todos = getTodos();
    });
    
    return (
        <>
            <h1>React works.</h1>

            <p>Todos:</p>

        </>
    );
}

export default hot(module)(App);
