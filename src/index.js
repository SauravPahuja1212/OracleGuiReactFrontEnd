import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Home from './component/home/Home';
import Login from './component/login/Login';
import Logout from './component/home/Logout';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={Login}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/logout' component={Logout}/>
        </div>
    </Router>,
document.getElementById('root'))

serviceWorker.unregister();
