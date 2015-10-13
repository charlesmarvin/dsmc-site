var React = require('react');
var DataGrid = require('components/grid/DataGrid');
var DataGridToolbar = require('components/grid/DataGridToolbar');
var Formatters = require('utils/Formatters');
var Services = require('./Services');
var Router = require('react-router');
var {RouteHandler, Link} = Router;

var Students = React.createClass({
    _columnConfigs: [
        {
            field: 'fullName',
            name: 'Name',
            render(val, context, id) {
                return (
                    <Link to="student" params={{id}} className="grid-item-edit-link">
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
        var newEntryLink = (<Link to="student" params={{id: 'new'}}>
                <i className="fa fa-user-plus"></i> New Student
            </Link>);
        var gridData = this._enrichStudentData(this.state.students);
        return (
            <div>
                <RouteHandler/>
                <DataGridToolbar newEntryLink={newEntryLink} filterHandler={this._handleSearch} />
                <DataGrid data={gridData} columnConfigs={this._columnConfigs} filter={this.state.filter} />
            </div>
        );
    }
});

module.exports = Students;
