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
            remember: ''
        };
    }
    
    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.username.trim() || !this.state.password.trim()) {
            //show warning and return
            return;
        }
        Services.login(this.state.username, this.state.password)
            .then(function(d) {
                console.log('success ' + d);
            },
            function(e) {
                console.log('error ' + e);
            });
    }
    
    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }
    
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    
    handlePersistLoginChange(event) {
        this.setState({remember: event.target.checked});
    }
    
    render() {
        return (
            <form className="forms login-form" onSubmit={this.handleSubmit.bind(this)}>
                <row>
                    <column cols="4">
                        <label>Username</label>
                        <input type="text" onChange={this.handleUsernameChange.bind(this)}/>
                    </column>
                    <column cols="4">
                        <label>Password</label>
                        <input type="password" onChange={this.handlePasswordChange.bind(this)}/>
                    </column>
                    <column>
                        <label>&nbsp;</label>
                        <button type="primary">Log in</button>
                    </column>
                </row>
                <label className="checkbox">
                    <input type="checkbox" onChange={this.handlePersistLoginChange.bind(this)}/> 
                    Keep me logged in
                </label>
            </form>
        );
    }
}
