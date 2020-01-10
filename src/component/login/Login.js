import React from 'react';
import '../../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../../service/AuthService'

class Login extends React.Component {

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.push('/home')
    }

    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                username: '',
                password: ''
            },
            formErrors: {
                username: '',
                password: ''
            },
            formValidity: {
                username: false,
                password: false
            },
            isSubmitting: false
        }

        this.handleSubmit  = this.handleSubmit.bind(this)
        this.Auth = new AuthService();
    }

    manageChange = ({ target }) => {
        const { formValues } = this.state;
        formValues[target.name] = target.value;
        this.setState({ formValues });
        this.manageValidation(target);
    }

    manageValidation = target => {
        const {name, value} = target;
        const formValidationErrors = this.state.formErrors;
        const validity = this.state.formValidity;

        validity[name] = value.length > 0;
        formValidationErrors[name] = validity[name]
            ? "" : `${name} is required and cannot be empty`;

        this.setState({
            formErrors : formValidationErrors,
            formValidity : validity
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isSubmitting : true });
        const { formValues, formValidity } = this.state;
        if(Object.values(formValidity).every(Boolean)) {
            this.Auth.login(formValues.username, formValues.password)
                .then(res => {
                    this.props.history.push('/home')
                })
                .catch(err => {
                    alert(err);
                })
            this.setState({ isSubmitting : false })
        }
        else {
            for( let key in formValues ) {
                let target = {
                    name: key,
                    value: formValues[key]
                };
                this.manageValidation(target);
            }
            this.setState({ isSubmitting : false })
        }
    }

    render(){
        const {formValues, formErrors, isSubmitting} = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-9 col-md-7 col-lg-5">
                        <div className="card card-signin my-5 signin">
                            <div className="card-body">
                                <h5 className="card-title text-center"><b>Please Sign In</b></h5>
                                <form className="form-signin" onSubmit={this.handleSubmit}>
                                    <div className="form-label-group">
                                        <input id="inputUname"
                                               name="username"
                                               className={`form-control ${
                                                   formErrors.username ? "is-invalid" : ""
                                               }`}
                                               placeholder="Username"
                                               onChange={this.manageChange}
                                               value={formValues.username} autoFocus />
                                        <label htmlFor="inputUname">Username</label>
                                        <div className="invalid-feedback">{formErrors.username}</div>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password"
                                               id="inputPassword"
                                               name="password"
                                               className={`form-control ${
                                                   formErrors.password ? "is-invalid" : ""
                                               }`}
                                               placeholder="Password"
                                               onChange={this.manageChange}
                                               value={formValues.password} />
                                        <label htmlFor="inputPassword">Password</label>
                                        <div className="invalid-feedback">{formErrors.password}</div>
                                    </div>
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember
                                            password</label>
                                    </div>
                                    <hr className="my-4" />
                                    <button className="btn btn-primary btn-block text-uppercase"
                                            disabled={isSubmitting}
                                            type="submit">
                                        {isSubmitting ? "Please wait..." : "Sign In"}
                                    </button>
                                    <hr className="my-4" />
                                </form>
                            </div>
                        </div>
                    </div>
{/*                    <div className="sideNav col-sm-9 col-md-7 col-lg-5 mr-auto">
                        <div className="loginText my-5">
                            <h1></h1>
                        </div>
                    </div>*/}
                </div>
            </div>
        )
    }
}

export default Login