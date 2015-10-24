import React from 'react';
import DataGrid from 'components/grid/DataGrid';
import DataGridToolbar from 'components/grid/DataGridToolbar';
import Formatters from 'utils/Formatters';
import {Link} from 'react-router';
import Services from './Services';

var Students = React.createClass({
    _columnConfigs: [
        {
            field: 'fullName',
            name: 'Name',
            render(val, context, id) {
                return (
                    <Link to={`/student/${id}`} className="grid-item-edit-link">
                        <span className="grid-item-edit-icon"><i className="fa fa-pencil"></i></span>
                        {val} 
                    </Link>
                );
            }
        },
        {
            field: 'fullAddress',
            name: 'Address'
        },
        {
            field: 'primaryPhone',
            format: Formatters.phoneNumber
        },
        {
            field: 'secondaryPhone',
            format: Formatters.phoneNumber
        },
        {
            field: 'dob',
            name: 'DOB',
            format(val) {
                return Formatters.date(val, 'MM/DD/YY');
            }
        }
    ],
    getInitialState() {
        return {
            students: [],
            filter: ''
        };
    },
    componentWillMount() {
        Services.getStudents().then(function(data) {
            this.setState({students: data});
        }.bind(this));
    },
    _enrichStudentData(data) {
        return data.map(function(datum) {
            var enrichedRecord = datum;
            enrichedRecord.fullName = [ datum.firstName, datum.lastName ].join(' ');
            enrichedRecord.fullAddress = [ datum.address.line1, 
                                           datum.address.line2, 
                                           datum.address.city,
                                           datum.address.state,
                                           datum.address.zipcode ].join(', ');
            return enrichedRecord;
        });
    },
    _handleSearch(filterString) {
        this.setState({
            filter: filterString 
        });
    },
    render() {
        var newEntryLink = (<Link to={'/student/new'}>
                <i className="fa fa-plus" title="New Student"></i>
            </Link>);
        var gridData = this._enrichStudentData(this.state.students);
        return (
            <div>
                <DataGridToolbar newEntryLink={newEntryLink} filterHandler={this._handleSearch} />
                <DataGrid data={gridData} columnConfigs={this._columnConfigs} filter={this.state.filter} />
            </div>
        );
    }
});

module.exports = Students;
