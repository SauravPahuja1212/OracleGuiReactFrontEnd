import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Home.css'

import withAuth from '../../security/withAuth'
import AuthService from '../../service/AuthService'
const Auth = new AuthService()

const handleSubmit = () => {
    Auth.logout()
    this.props.history.replace('/')
}

const Home = ({match}) => {
    return(
        <div className="container">
            <nav className="navbar navbar-expand-md navbar-dark bg-light fixed-top mb">
                <NavLink className="navbar-brand" to="/"> <h2>Home</h2> </NavLink>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#TopNavbar" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="TopNavbar">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logout">Page 1</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/page-2">Page 2</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/nested-routes">Nested Routes</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default withAuth(Home)