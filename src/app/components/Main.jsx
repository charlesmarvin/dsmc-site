import React from 'react';
import {Link} from 'react-router';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false, 
            isLoggedIn: LoginStore.isLoggedIn,
            isLoading: LoginStore.isLoading,
            showAddView: false
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
        this.setState({
            isLoggedIn: LoginStore.isLoggedIn,
            isLoading: LoginStore.isLoading
        });
    }
    
    _toggleNav(event) {
        this.setState({isOpen: !this.state.isOpen});
    }
    
    _logout(event) {
        event.preventDefault();
        LoginActions.logoutUser();
    }
    
    render() {
        let navLinks = '', loginLinks = '';
        if (this.state.isLoggedIn && !this.state.isLoading) {
            navLinks = (
                <span>
                    <Link to="/students" activeClassName="border-bottom" className="btn py2" title="View All Students">Students</Link>
                    <Link to="/packages" activeClassName="border-bottom" className="btn py2" title="View All Packages">Packages</Link>
                    <Link to="/instructors" activeClassName="border-bottom" className="btn py2" title="View All Instructors">Instructors</Link>
                </span>
            );
            loginLinks = (<a onClick={this._logout} className="btn py2" title="Logout">Logout</a>);
        } else {
            loginLinks = (<Link to="/login" className="btn py2" title="Login">Login</Link>);
        }
        let loader = '';
        if (this.state.isLoading) {
            loader = <div className="sk-rotating-plane"></div>;
        }

        return (
            <div>
                <nav className="clearfix mb1">
                  <div className="sm-col">
                    <Link to="/" className="btn py2 caps bg-black white">Driver A</Link>
                    {navLinks}
                  </div>
                  <div className="sm-col-right">
                    {loginLinks}
                  </div>
                </nav>
                {this.props.children}
                {loader}
            </div>
        );
    }
}

Main.propTypes = {
    children: React.PropTypes.node
};
