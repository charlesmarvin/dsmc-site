import React from 'react';
import {Link} from 'react-router';
import Services from './Services';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stayLoggedIn: false,
            username: '',
            password: '',
            hasUsernameError: false,
            hasPasswordError: false,
            hasLoginError: false
        };
        this.isLoginFormValid = this.isLoginFormValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
        
        Services.login(this.state.username, this.state.password)
            .catch(function(e) {
                console.log('login error: ' + e);
                this.setState({hasLoginError: true});
            }.bind(this));
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
        var requiredError = <span className="error">Required</span>;
        var usernameError = (this.state.hasUsernameError) ? requiredError : '';
        var passwordError = (this.state.hasPasswordError) ? requiredError : '';
        var loginError = (this.state.hasLoginError) ? <span className="error">Login failed</span> : '';
        return (
            <form className="forms login-form width-6" onSubmit={this.handleSubmit}>
                <section>
                    <label>Username {usernameError}</label>
                    <input type="text" onChange={this.handleUsernameChange}/>
                </section>
                <section>
                    <label>Password {passwordError}</label>
                    <input type="password" onChange={this.handlePasswordChange}/>
                </section>
                <section>
                    <button type="primary">Log in</button>
                    <p>{loginError}</p>
                </section>
            </form>
        );
    }
}
