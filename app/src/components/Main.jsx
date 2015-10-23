var React = require('react');
var Router = require('react-router');
var {RouteHandler, Link} = Router;

var Main = React.createClass({
    render() {
        return (
            <div className="container">
                <header id="main-nav-header" className="group">
                    <nav className="left">
                        <ul>
                            <li className="branding-home"><Link to="dashboard">Driver A</Link></li>
                            <li><Link to="students">Students</Link></li>
                            <li><Link to="packages">Packages</Link></li>
                            <li><Link to="instructors">Instructors</Link></li>
                            <li><Link to="admin">Admin</Link></li>
                        </ul>
                    </nav>
                </header>
                <RouteHandler/>
            </div>
        );
    }
});

module.exports = Main;
