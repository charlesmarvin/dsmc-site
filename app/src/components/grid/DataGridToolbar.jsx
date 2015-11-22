import React from 'react';

export default class GridToolBar extends React.Component {
    constructor(props) {
        super(props);
    }
    
    _handleSearch(event) {
        event.preventDefault();
        var searchText = React.findDOMNode(this.refs.searchInput).value.trim();
        this.props.filterHandler(searchText);
    }
    
    _handlePrint(event) {
        event.preventDefault();
        window.print();
    }
    
    render() {
        var print = '';
        if (this.props.enablePrint) {
            print = (
                <li key="print">
                    <a title="Print" data-theme="blue" data-tools="tooltip" onClick={this._handlePrint}>
                        <i className="fa fa-print"></i> 
                      </a>
                </li>
            );
        }
        var download = '';
        if (this.props.enableDownload) {
            download = (
                <li key="download">
                    <a title="Download" data-theme="blue" data-tools="tooltip">
                        <i className="fa fa-download"></i>  
                    </a>
                </li>
            );
        }
        var searchWidget = '';
        if (this.props.enableFilter) {
            searchWidget = (
                <form className="right end" onSubmit={this._handleSearch}>
                    <input type="search" name="go" placeholder="Search" 
                        ref="searchInput" className="input-small" onBlur={this._handleSearch} />
                </form>
            );
        }
        var addNewItemLink = '';
        if (this.props.enableAdd) {
            addNewItemLink = (
                <li key="addNewItemLink">
                    {this.props.newEntryLink}
                </li>
            );
        }
        return (
            <header className="grid-toolbar-header">
                <nav className="left">
                    <ul>
                    {addNewItemLink}
                    {print}
                    {download}
                    </ul>
                </nav>
                {searchWidget}
            </header>
        );
    }
}

GridToolBar.propTypes = {
    filterHandler: React.PropTypes.func.isRequired,
    newEntryLink: React.PropTypes.object.isRequired,
    enablePrint: React.PropTypes.bool,
    enableDownload: React.PropTypes.bool,
    enableFilter: React.PropTypes.bool,
    enableAdd: React.PropTypes.bool
};

GridToolBar.defaultProps = {
    enablePrint: true,
    enableDownload: true,
    enableFilter: true,
    enableAdd: true,
    filterHandler() {} //no-op filter handler
};
