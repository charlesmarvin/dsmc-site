import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import Formatters from 'utils/Formatters';
import DataGrid from 'components/grid/DataGrid';
import DataGridToolbar from 'components/grid/DataGridToolbar';
import DashboardActions from '../actions/DashboardActions';
import DashboardStore from '../stores/DashboardStore';

export default class InstructorsTableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            instructors: []
        };
        this.columnConfigs = [
            {
                field: 'fullName',
                name: 'Name',
                render(val, context, id) {
                    return (
                        <Link to={`/instructor/${id}`} className="grid-item-edit-link">
                            {val} 
                        </Link>
                    );
                }
            },
            {
                field: 'certificationDate',
                name: 'Certified On',
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
        this._handleSearch = this._handleSearch.bind(this);
        this._onDataLoaded = this._onDataLoaded.bind(this);
    }

    componentWillMount() {
        DashboardStore.addChangeListener(this._onDataLoaded);
    }

    componentDidMount() {
        DashboardActions.loadInstructors();
    }
    
    componentWillUnmount() {
        DashboardStore.removeChangeListener(this._onDataLoaded);
    }

    _onDataLoaded() {
        this.setState({instructors: DashboardStore.instructors});
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
        var gridData = this._transform(this.state.instructors);
        return (
            <div>
                <DataGridToolbar filterHandler={this._handleSearch} />
                <DataGrid data={gridData} columnConfigs={this.columnConfigs} filter={this.state.filter} />
            </div>
        );
    }
}
