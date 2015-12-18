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
        var links = this.state.isLoggedIn ?
            (<ul className="list-reset">
                <li className="inline-block mr1"><Link to="/students">Students</Link></li>
                <li className="inline-block mr1"><Link to="/packages">Packages</Link></li>
                <li className="inline-block mr1"><Link to="/instructors">Instructors</Link></li>
                <li className="inline-block mr1"><Link to="/admin">Admin</Link></li>
                <li className="inline-block mr1"><a onClick={this._logout}>Logout</a></li>
            </ul>)
            : 
            (<ul>
                <li className="inline-block mr1"><Link to="/login">Login</Link></li>
            </ul>);
        return (
            <div className="clearfix">
                <header className="nav-header group">
                    <Link to="/" className="brand">Driver A</Link>
                    <a className="nav-toggle" onClick={this._toggleNav}>
                        <i className="fa fa-bars fa-lg"></i>
                    </a>
                    <nav className={this.state.isOpen ? 'open' : ''}>
                        {links}
                    </nav>
                </header>
                {this.props.children}
            </div>
        );
    }
}

Main.propTypes = {
    children: React.PropTypes.node
};
