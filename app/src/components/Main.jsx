import React from 'react';
import {Link} from 'react-router';

var Main = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },
    render() {
        return (
            <div className="container">
                <header id="main-nav-header" className="group">
                    <nav className="left">
                        <ul>
                            <li className="branding-home">
                                <Link to="/">Driver A</Link>
                            </li>
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
