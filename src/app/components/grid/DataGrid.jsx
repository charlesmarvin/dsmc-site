import React from 'react';
import Formatters from 'utils/Formatters';
import ObjUtils from 'utils/ObjUtils';

class DataGridHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var trs = this.props.columnConfigs
            .filter(function(config) {
                return !config.disabled;
            }.bind(this))
            .map(function(config, idx) {
                var columnHeading = config.name;
                if (!columnHeading) {
                    columnHeading = Formatters.camelToTitle(config.field);
                }
                if (config.renderHeader) {
                    columnHeading = config.renderHeader(columnHeading);
                }
                return (
                    <th key={idx}>
                        {columnHeading}
                    </th>
                );
            }.bind(this));
        return (
            <thead>
                <tr>
                    {trs}
                </tr>
            </thead>
        );
    }
}

DataGridHeader.propTypes = {
    columnConfigs: React.PropTypes.arrayOf(React.PropTypes.shape({
        field: React.PropTypes.string.isRequired,
        name: React.PropTypes.string,
        format: React.PropTypes.func,
        renderHeader: React.PropTypes.func,
        enabled: React.PropTypes.bool
    })).isRequired
};

class DataGridRow extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var tds = this.props.columnConfigs
            .filter(function(config) {
                return !config.disabled;
            }.bind(this))
            .map(function(config, idx) {
                var value = ObjUtils.deepGet(this.props.rowData, config.field);
                if (config.format) {
                    value = config.format(value);
                }
                if (config.render) {
                    value = config.render(value, this.props.rowData, this.props.rowId);
                }
                return (
                    <td key={idx}>
                        {value}
                    </td>
                );
            }.bind(this));
        return (
            <tr>
                {tds}
            </tr>
        );
    }
}

DataGridRow.defaultProps = {
    rowData: []
};
DataGridRow.propTypes = {
    rowId: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]).isRequired,
    rowData: React.PropTypes.object.isRequired,
    columnConfigs: React.PropTypes.arrayOf(React.PropTypes.shape({
        field: React.PropTypes.string.isRequired,
        format: React.PropTypes.func,
        render: React.PropTypes.func,
        enabled: React.PropTypes.bool
    })).isRequired
};

class DataGridBody extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var trs = this.props.data.map(function(row, idx) {
            return (<DataGridRow key={idx} rowId={row.id} rowData={row} 
                        columnConfigs={this.props.columnConfigs}/>);
        }.bind(this));
        return (
            <tbody>
                {trs}
            </tbody>
        );
    }
}

DataGridBody.defaultProps = {
    rowData: []
};

DataGridBody.propTypes = {
    data: React.PropTypes.array.isRequired,
    columnConfigs: React.PropTypes.array.isRequired
};

export default class DataGrid extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var filterFn = ObjUtils.deepfilterFactory(this.props.filter, ['_id', 'guid']);
        var gridData = (this.props.filter.length) ? this.props.data.filter(filterFn) : this.props.data;
        
        return (
            <div>
                <table className="table-light">
                    <DataGridHeader columnConfigs={this.props.columnConfigs}/>
                    <DataGridBody data={gridData} columnConfigs={this.props.columnConfigs} />
                </table>
            </div>
        );
    }
}

DataGrid.defaultProps = {
    filter: ''
};
    
DataGrid.propTypes = {
    filter: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
    columnConfigs: React.PropTypes.array.isRequired 
};
