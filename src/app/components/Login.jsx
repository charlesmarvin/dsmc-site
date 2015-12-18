import React from 'react';
import {Link} from 'react-router';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stayLoggedIn: false,
            username: '',
            password: '',
            hasUsernameError: false,
            hasPasswordError: false,
            hasLoginError: false,
            loading: false
        };
        this.isLoginFormValid = this.isLoginFormValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this._onAuthStateChanged = this._onAuthStateChanged.bind(this);
    }

    componentDidMount() {
        LoginStore.addChangeListener(this._onAuthStateChanged);
    }
    
    componentWillUnmount() {
        LoginStore.removeChangeListener(this._onAuthStateChanged);
    }

    _onAuthStateChanged() {
        this.setState({
            hasLoginError: LoginStore.hasError,
            loading: LoginStore.isLoading
        });
    }
    
    isLoginFormValid() {
        var isValid = true;
        if (!this.state.username.trim()) {
            this.setState({hasUsernameError: true});
            isValid = false;
        } 
        if (!this.state.password.trim()) {
            this.setState({hasPasswordError: true});
            isValid = false;
        }
        return isValid;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.isLoginFormValid()) {
            return;
        }
        this.setState({
            hasUsernameError: false,
            hasPasswordError: false,
            hasLoginError: false
        });
        
        LoginActions.loginUser(this.state.username, this.state.password);
    }
    
    handleUsernameChange(event) {
        this.setState({
            hasUsernameError: false,
            hasLoginError: false,
            username: event.target.value
        });
    }
    
    handlePasswordChange(event) {
        this.setState({
            hasPasswordError: false,
            hasLoginError: false,
            password: event.target.value
        });
    }
    
    render() {
        var requiredError = <span className="red h5">Required</span>;
        var usernameError = (this.state.hasUsernameError) ? requiredError : '';
        var passwordError = (this.state.hasPasswordError) ? requiredError : '';
        var loginError = (this.state.hasLoginError) ? <span className="red">Login failed</span> : '';
        var loading = (this.state.loading) ? <i className="fa fa-spinner"></i> : '';
        return (
            <form className="md-col-4 p2 mx-auto" onSubmit={this.handleSubmit}>
                <section>
                    <label>Username {usernameError}</label>
                    <input className="block col-12 mb1 field" 
                        type="text" onChange={this.handleUsernameChange}/>
                </section>
                <section>
                    <label>Password {passwordError}</label>
                    <input className="block col-12 mb1 field" 
                        type="password" onChange={this.handlePasswordChange}/>
                </section>
                <section>
                    <button type="submit" className="btn btn-primary">Log in {loading}</button>
                    <p>{loginError}</p>
                </section>
            </form>
        );
    }
}
