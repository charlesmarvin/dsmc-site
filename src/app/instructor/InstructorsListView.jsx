import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import Formatters from 'app/common/utils/Formatters';
import DataGrid from 'app/common/grid/DataGrid';
import DataGridToolbar from 'app/common/grid/DataGridToolbar';
import InstructorActions from './actions';
import InstructorStore from './store';

export default class InstructorsListView extends React.Component {
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
        InstructorStore.addChangeListener(this._onDataLoaded);
    }

    componentDidMount() {
        InstructorActions.loadInstructors();
    }
    
    componentWillUnmount() {
        InstructorStore.removeChangeListener(this._onDataLoaded);
    }

    _onDataLoaded() {
        this.setState({instructors: InstructorStore.instructors});
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
            let gridData = this._transform(this.state.instructors);
            activeView = (
                <div>
                    <DataGridToolbar filterHandler={this._handleSearch} 
                        newRecordLink={"/instructor/new"}
                        newRecordLinkText={"Add Instructor"} />
                    <DataGrid data={gridData} columnConfigs={this.columnConfigs} filter={this.state.filter} />
                </div>
            );
        }
        return (activeView);
    }
}

InstructorsListView.propTypes = {
    children: React.PropTypes.node
};
