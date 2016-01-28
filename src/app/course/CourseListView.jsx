import React from 'react';
import {Link} from 'react-router';
import DataGrid from 'app/common/grid/DataGrid';
import DataGridToolbar from 'app/common/grid/DataGridToolbar';
import Formatters from 'app/common/utils/Formatters';
import Services from 'app/common/Services';

export default class CourseListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packages: []
        };
        this.columnConfigs = [
            {
                field: 'name',
                render(val, context, id) {
                    return (
                        <Link to={`/package/${id}`}>
                            {val}
                        </Link>
                    );
                }
            },
            {
                field: 'active',
                render(val, context, id) {
                    function updateActiveStatus(event) {
                        HTTP.patch('/api/v1/packages/' + id, {active: event.target.checked});
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
    }
    
    componentWillMount() {
        Services.getPackages().then(function(data) {
            this.setState({packages: data});
        }.bind(this));
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
                        newRecordLink={"/package/new"}
                        newRecordLinkText={"Add Package"} />
                    <DataGrid data={this.state.packages} columnConfigs={this.columnConfigs} 
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
