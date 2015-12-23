import React from 'react';
import {Link} from 'react-router';
import Student from './Student';
// import Instructor from './Instructor';
import Package from './Package';

const STUDENT_TAB = 'STUDENT_TAB';
const INSTRUCTOR_TAB = 'INSTRUCTOR_TAB';
const PACKAGE_TAB = 'PACKAGE_TAB';

export default class AddItemView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: STUDENT_TAB
        };
    }

    _switchTab(e, tabName) {
        this.setState({selectedTab: tabName});
    }

    render() {
        var content = '', instructorTabClass = '', studentTabClass = '', packageTabClass = '';
        switch (this.state.selectedTab) {
        case INSTRUCTOR_TAB:
            instructorTabClass = 'border-bottom';
            content = <span>Not Implemnted</span>;
            break;
        case PACKAGE_TAB:
            packageTabClass = 'border-bottom';
            content = <Package params={{}}/>;
            break;
        case STUDENT_TAB:
        default:
            studentTabClass = 'border-bottom';
            content = <Student params={{}}/>;
            break;
        }
        return (
            <div className="flex">
                <div className="flex-auto py2">
                    <nav>
                        <a onClick={(e) => this._switchTab(e, STUDENT_TAB)} 
                            className={'btn ' + studentTabClass}>Add New Student</a>
                        <a onClick={(e) => this._switchTab(e, INSTRUCTOR_TAB)} 
                            className={'btn ' + instructorTabClass}>Add New Instructor</a>
                        <a onClick={(e) => this._switchTab(e, PACKAGE_TAB)} 
                            className={'btn ' + packageTabClass}>Add New Package</a>
                    </nav>
                    <div className="p2">
                       {content}
                    </div>
                </div>
            </div>
        );
    }
}
