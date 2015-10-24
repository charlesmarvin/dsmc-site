import React from 'react';
import {Link} from 'react-router';

var Dashboard = React.createClass({
    render() {
        return (
            <blocks cols="3">
                <div>
                    <Link to="students" className="dashboard-launcher students">
                        <h1 className="title">
                            Students
                        </h1>
                        <p className="caption">
                            Add new students and manage info on existing ones 
                        </p>
                    </Link>
                </div>

                <div>
                    <Link to="packages" className="dashboard-launcher packages">
                        <h1 className="title">
                            Packages
                        </h1>
                        <p className="caption">
                            Manage details about offered licensing packages 
                        </p>
                    </Link>
                </div>

                <div>
                    <Link to="instructors" className="dashboard-launcher instructors">
                        <h1 className="title">
                            Instructors
                        </h1>
                        <p className="caption">
                            Add and update information for affiliated instructors
                        </p>
                    </Link>
                </div>

            </blocks>
        );
    }
});

module.exports = Dashboard;
