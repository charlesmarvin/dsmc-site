var React = require('react');
var DataGrid = require('components/grid/DataGrid');
var DataGridToolbar = require('components/grid/DataGridToolbar');
var Formatters = require('utils/Formatters');
var Router = require('react-router');
var {Link} = Router;
var Services = require('./Services');

var Packages = React.createClass({
    _columnConfigs: [
        {
            field: 'name',
            render(val, context, id) {
                return (
                    <Link to="package" params={{id}}>
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
            <Link to="package" params={{id: 'new'}}>
                <i className="fa fa-user-plus"></i> New Package
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
