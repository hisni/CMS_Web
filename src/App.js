import React, { Component } from 'react';
import { IconContext } from "react-icons";

// import './App.css';
import './App.scss';
import './styles/core.scss';

import Main from './containers/Main/Main';

class App extends Component {

    render() {
        return (
            <IconContext.Provider value={{ color: "rgb(3, 78, 41)",style: { verticalAlign: 'middle' } , className: "global-class-name" }}>
                <div className="App">
                    <Main />
                </div>
            </IconContext.Provider>
        );
    }
}

export default App;

