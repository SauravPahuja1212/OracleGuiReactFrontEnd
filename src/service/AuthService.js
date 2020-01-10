import decode from 'jwt-decode';

export default class AuthService {

    constructor(domain) {
        this.domain = domain || 'http://localhost:8080'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(username, password) {
        return this.fetch(`${this.domain}/token`, {
            method : 'POST',
            body : JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setToken(res.token)
            return Promise.resolve(res)
        })
    }

    loggedIn() {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decode = decode(token)
            if(decode.exp < Date.now() / 1000) {
                return true
            }
            else
                return false
        } catch(err) {
            return false
        }
    }

    setToken(authToken) {
        localStorage.setItem('auth_token', authToken)
    }

    getToken() {
        return localStorage.getItem('auth_token')
    }

    logout() {
        localStorage.removeItem('auth_token')
    }

    getProfile() {
        return decode(this.getToken())
    }

    fetch(url, options) {

        const headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }

        if(this.loggedIn()) {
            headers['Authorization'] = 'Bearer' + this.getToken()
        }

        return fetch(url, {
            headers, ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        if(response.status >= 200 && response.status < 300) {
            return response
        }
        else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}