import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import Formatters from 'app/common/utils/Formatters';
import DataGrid from 'app/common/grid/DataGrid';
import DataGridToolbar from 'app/common/grid/DataGridToolbar';
import StudentActions from './StudentActions';
import StudentStore from './StudentStore';

export default class StudentsListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            students: []
        };
        this.columnConfigs = [
            {
                field: 'fullName',
                name: 'Name',
                render(val, context, id) {
                    return (
                        <Link to={`/student/${id}`} className="grid-item-edit-link">
                            {val} 
                        </Link>
                    );
                }
            },
            {
                field: 'dob',
                name: 'DOB',
                format(val) {
                    return Formatters.date(val, 'MM/DD/YY');
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
            }
        ];
        this._onDataLoaded = this._onDataLoaded.bind(this);
        this._handleSearch = this._handleSearch.bind(this);
    }
    
    componentWillMount() {
        StudentStore.addChangeListener(this._onDataLoaded);
    }

    componentDidMount() {
        StudentActions.loadStudents();
    }
    
    componentWillUnmount() {
        StudentStore.removeChangeListener(this._onDataLoaded);
    }

    _onDataLoaded() {
        this.setState({students: StudentStore.students});
    }
    
    _transform(data) {
        return data.map(function(datum) {
            var enrichedRecord = datum;
            enrichedRecord.fullName = [ datum.firstName, datum.lastName ].join(' ');
            enrichedRecord.fullAddress = [ datum.addressLine1, 
                                           datum.addressLine2, 
                                           datum.city,
                                           datum.state,
                                           datum.zipcode ].filter((e) => !_.isEmpty(e)).join(', ');
            return enrichedRecord;
        });
    }
    
    _handleSearch(filterString) {
        this.setState({
            filter: filterString 
        });
    }
    
    render() {
        let activeView = this.props.children;
        if (!activeView) {
            let gridData = this._transform(this.state.students);
            activeView = (
                <div>
                    <DataGridToolbar filterHandler={this._handleSearch} 
                        newRecordLink={"/student/new"}
                        newRecordLinkText={"Add Student"} />
                    <DataGrid data={gridData} columnConfigs={this.columnConfigs} filter={this.state.filter} />
                </div>
            );
        }
        return (activeView);
    }
}
