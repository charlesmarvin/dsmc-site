import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

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
        let print = '';
        if (this.props.enablePrint) {
            print = (
                <a title="Print" className="btn blue" data-tools="tooltip" onClick={this._handlePrint}>
                    Print
                </a>
            );
        }
        let download = '';
        if (this.props.enableDownload) {
            download = (
                <a title="Download" className="btn blue" data-tools="tooltip">
                    Download 
                </a>
            );
        }
        let searchWidget = '';
        if (this.props.enableFilter) {
            searchWidget = (
                <form className="right" onSubmit={this._handleSearch}>
                    <input type="search" name="go" placeholder="Search" 
                        ref="searchInput" className="field p0 m0 grid-search-input" 
                        onBlur={this._handleSearch} />
                </form>
            );
        }
        let newRecordLink = '';
        if (this.props.newRecordLink) {
            let linkText = this.props.newRecordLinkText || 'Add';
            newRecordLink = (
                <Link to={this.props.newRecordLink} className="btn btn-primary mb1 bg-green">
                    {linkText}
                </Link>
            );
        }
        return (
            <header className="px2">
                <nav className="left">
                    {newRecordLink}
                    {print}
                    {download}
                </nav>
                {searchWidget}
            </header>
        );
    }
}

GridToolBar.propTypes = {
    filterHandler: React.PropTypes.func,
    enablePrint: React.PropTypes.bool,
    enableDownload: React.PropTypes.bool,
    enableFilter: React.PropTypes.bool,
    enableAdd: React.PropTypes.bool,
    newRecordLink: React.PropTypes.string,
    newRecordLinkText: React.PropTypes.string
};

GridToolBar.defaultProps = {
    enablePrint: true,
    enableDownload: true,
    enableFilter: true,
    enableAdd: true,
    newRecordLink: '',
    newRecordLinkText: '',
    filterHandler() {} //no-op filter handler
};
