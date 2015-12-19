import React from 'react';
import {Link} from 'react-router';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';
import Services from './Services';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false, 
            isLoggedIn: LoginStore.isLoggedIn
        };
        this._onChange = this._onChange.bind(this);
        this._toggleNav = this._toggleNav.bind(this);
    }
    
    componentDidMount() {
        LoginStore.addChangeListener(this._onChange);
    }
    
    componentWillUnmount() {
        LoginStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({isLoggedIn: LoginStore.isLoggedIn});
    }
    
    _toggleNav(event) {
        this.setState({isOpen: !this.state.isOpen});
    }
    
    _logout(event) {
        event.preventDefault();
        LoginActions.logoutUser();
    }
    
    render() {
        var navLinks = '', 
            loginLinks = '', 
            homeLink = (<Link to="/" className="btn py2 caps bg-black white">Driver A</Link>),
            navStateClass = this.state.isOpen ? 'show' : 'hide';
        if (this.state.isLoggedIn) {
            navLinks = (
                <span>
                    <Link to="/students" className="btn py2">Students</Link>
                    <Link to="/packages" className="btn py2">Packages</Link>
                    <Link to="/instructors" className="btn py2">Instructors</Link>
                    <Link to="/admin" className="btn py2">Admin</Link>
                </span>
            );
            loginLinks = (<a onClick={this._logout} className="btn py2 {navStateClass}">Logout</a>);
        } else {
            loginLinks = (<Link to="/login" className="btn py2 {navStateClass}">Login</Link>);
        }
        return (
            <div>
                <nav className="clearfix mb2">
                  <div className="md-col">
                    {homeLink}
                    {navLinks}
                  </div>
                  <div className="right">
                    {loginLinks}
                  </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}

Main.propTypes = {
    children: React.PropTypes.node
};
