import React from 'react';
import {hot} from 'react-hot-loader';
import Todo from "./components/Todo";

function App() {
    return (
        <>
            <Todo/>
        </>
    );
}

export default hot(module)(App);
