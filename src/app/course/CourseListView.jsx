import React from 'react';
import {Link} from 'react-router';
import DataGrid from 'app/common/grid/DataGrid';
import DataGridToolbar from 'app/common/grid/DataGridToolbar';
import Formatters from 'app/common/utils/Formatters';
import Services from 'app/common/Services';
import CourseActions from './actions';
import CourseStore from './store';

export default class CourseListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
        this.columnConfigs = [
            {
                field: 'name',
                render(val, context, id) {
                    return (
                        <Link to={`/course/${id}`}>
                            {val}
                        </Link>
                    );
                }
            },
            {
                field: 'active',
                render(val, context, id) {
                    function updateActiveStatus(event) {
                        HTTP.patch('/api/v1/courses/' + id, {active: event.target.checked});
                    }
                    return (
                        <input type="checkbox" defaultChecked={val} onChange={updateActiveStatus} />
                    );
                },
                renderContext: this
            },
            {
                field: 'description'
            },
            {
                field: 'price',
                format: Formatters.currency
            }
        ];
        this._onDataLoaded = this._onDataLoaded.bind(this);
    }

    componentWillMount() {
        CourseStore.addChangeListener(this._onDataLoaded);
    }

    componentDidMount() {
        CourseActions.loadCourses();
    }
    
    componentWillUnmount() {
        CourseStore.removeChangeListener(this._onDataLoaded);
    }

    _onDataLoaded() {
        this.setState({courses: CourseStore.courses});
    }
    
    _handleSearch(filterString) {
        this.setState({
            filter: filterString 
        });
    }
    
    render() {
        let activeView = this.props.children;
        if (!activeView) {
            activeView = (
                <div>
                    <DataGridToolbar filterHandler={this._handleSearch} 
                        newRecordLink={"/course/new"}
                        newRecordLinkText={"Add Package"} />
                    <DataGrid data={this.state.courses} columnConfigs={this.columnConfigs} 
                        filter={this.state.filter} />
                </div>
            );
        }
        return (activeView);
    }
}
CourseListView.propTypes = {
    children: React.PropTypes.node
};
