import React, { Component } from 'react';
import '../../App.css'
import AuthService from '../../service/AuthService'
import withAuth from '../../security/withAuth'
const Auth = new AuthService();

class Logout extends Component {

    handleLogout(){
        Auth.logout()
        this.props.history.replace('/');
    }

    render() {
        return (
            <div className="App">
                <p className="App-intro">
                    <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
                </p>
            </div>
        );
    }
}

export default withAuth(Logout);