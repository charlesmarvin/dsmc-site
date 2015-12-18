import React from 'react';
import ReactDOM from 'react-dom';

export default class GridToolBar extends React.Component {
    constructor(props) {
        super(props);
        this._handleSearch = this._handleSearch.bind(this);
    }
    
    _handleSearch(event) {
        event.preventDefault();
        var searchText = ReactDOM.findDOMNode(this.refs.searchInput).value.trim();
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
                <li key="print" className="inline-block mr1">
                    <a title="Print" data-theme="blue" data-tools="tooltip" onClick={this._handlePrint}>
                        <i className="fa fa-print"></i> 
                      </a>
                </li>
            );
        }
        var download = '';
        if (this.props.enableDownload) {
            download = (
                <li key="download" className="inline-block mr1">
                    <a title="Download" data-theme="blue" data-tools="tooltip">
                        <i className="fa fa-download"></i>  
                    </a>
                </li>
            );
        }
        var searchWidget = '';
        if (this.props.enableFilter) {
            searchWidget = (
                <form className="right" onSubmit={this._handleSearch}>
                    <input type="search" name="go" placeholder="Search" 
                        ref="searchInput" className="field" onBlur={this._handleSearch} />
                </form>
            );
        }
        var addNewItemLink = '';
        if (this.props.enableAdd) {
            addNewItemLink = (
                <li key="addNewItemLink" className="inline-block mr1">
                    {this.props.newEntryLink}
                </li>
            );
        }
        return (
            <header className="px2">
                <nav className="left">
                    <ul className="list-reset">
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
