import React from 'react';
import DataGrid from 'components/grid/DataGrid';
import DataGridToolbar from 'components/grid/DataGridToolbar';
import Formatters from 'utils/Formatters';
import {Link} from 'react-router';
import Services from './Services';

export default class Packages extends React.Component {
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
        return (
            <div>
                <DataGridToolbar filterHandler={this._handleSearch} />
                <DataGrid data={this.state.packages} columnConfigs={this.columnConfigs} 
                    filter={this.state.filter} />
            </div>
        );
    }

}
