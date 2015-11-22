import React from 'react';
import {Link} from 'react-router';
import LoginStore from '../stores/LoginStore';
import Services from './Services';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false, 
            isLoggedIn: LoginStore.isLoggedIn
        };
        this._onChange = this._onChange.bind(this);
    }
    
    componentDidMount() {
        LoginStore.addChangeListener(this._onChange);
    }
    
    _onChange() {
        this.setState({isLoggedIn: LoginStore.isLoggedIn});
    }
    
    componentWillUnmount() {
        LoginStore.removeChangeListener(this._onChange);
    }
    
    toggle(event) {
        this.setState({isOpen: !this.state.isOpen});
    }
    
    logout(event) {
        event.preventDefault();
        Services.logout();
    }
    
    render() {
        var links = this.state.isLoggedIn ?
            (<ul>
                <li><Link to="/students">Students</Link></li>
                <li><Link to="/packages">Packages</Link></li>
                <li><Link to="/instructors">Instructors</Link></li>
                <li><Link to="/admin">Admin</Link></li>
                <li><a onClick={this.logout}>Logout</a></li>
            </ul>)
            : 
            (<ul>
                <li><Link to="/login">Login</Link></li>
            </ul>);
        return (
            <div className="container">
                <header className="nav-header group">
                    <Link to="/" className="brand">Driver A</Link>
                    <a className="nav-toggle" onClick={this.toggle}><i className="fa fa-bars fa-lg"></i></a>
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
