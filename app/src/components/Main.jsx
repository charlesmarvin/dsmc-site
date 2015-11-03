import React from 'react';
import {Link} from 'react-router';

var Main = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },
    getInitialState() {
        return { isOpen: false };
    },
    toggle(event) {
        this.setState({ isOpen: !this.state.isOpen });
    },
    render() {
        return (
            <div className="container">
                <header className="nav-header group">
                    <Link to="/" className="brand">Driver A</Link>
                    <a className="nav-toggle" onClick={this.toggle}><i className="fa fa-bars fa-lg"></i></a>
                    <nav className={this.state.isOpen ? 'open' : ''}>
                        <ul>
                            <li><Link to="/students">Students</Link></li>
                            <li><Link to="/packages">Packages</Link></li>
                            <li><Link to="/instructors">Instructors</Link></li>
                            <li><Link to="/admin">Admin</Link></li>
                        </ul>
                    </nav>
                </header>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Main;
