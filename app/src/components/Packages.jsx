import React from 'react';
import DataGrid from 'components/grid/DataGrid';
import DataGridToolbar from 'components/grid/DataGridToolbar';
import Formatters from 'utils/Formatters';
import {Link} from 'react-router';
import Services from './Services';

var Packages = React.createClass({
    _columnConfigs: [
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
    ],
    getInitialState() {
        return {
            packages: []
        };
    },
    componentWillMount() {
        Services.getPackages().then(function(data) {
            this.setState({packages: data});
        }.bind(this));
    },
    _handleSearch(filterString) {
        this.setState({
            filter: filterString 
        });
    },
    render() {
        var newEntryLink = (
            <Link to={'/package/new'}>
                <i className="fa fa-plus" title="Add New Package"></i>
            </Link>
        );
        return (
            <div className="unit-row">
                <DataGridToolbar newEntryLink={newEntryLink} filterHandler={this._handleSearch} />
                <DataGrid data={this.state.packages} columnConfigs={this._columnConfigs} 
                    filter={this.state.filter} />
            </div>
        );
    }

});

module.exports = Packages;
