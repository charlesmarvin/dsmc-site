var React = require('react');
var HTTP = require('utils/HTTP');

var Package = React.createClass({
    getInitialState() {
        return {
            id: 'new',
            package: {}
        };
    },
    componentWillMount() {
        var {id} = this.context.router.getCurrentParams();
        if (id !== 'new') {
            this.setState({id});
            HTTP.get('/api/v1/packages/' + id, function(data) {
                this.setState({package: data});
            }.bind(this));
        }
    },
    _handlePackageFieldUpdate(event) {
        this.state.package[event.target.id] = (event.target.type === 'checkbox') ? 
            event.target.checked : event.target.value;
        this.setState({package: this.state.package});
    },
    _handleSave(event) {
        event.preventDefault();
        var endpoint = '/api/v1/packages';
        if (this.state.id === 'new') {
            HTTP.post(endpoint, this.state.package);
        } else {
            endpoint = endpoint + '/' + this.state.id;
            HTTP.put(endpoint, this.state.package);
        }
        this.context.router.transitionTo('packages');
    },
    render() {
        return (
             <form className="forms unit-padding" onSubmit={this._handleSave}>
                <div>
                  <label htmlFor="name">
                    Package Name <span className="req">*</span>
                    <input id="name" className="width-60" type="text" required 
                        value={this.state.package.name} 
                        onChange={this._handlePackageFieldUpdate}/>
                  </label>
                </div>

                <div>
                  <label htmlFor="description">
                    Description
                    <textarea id="description" className="width-60" type="text" 
                        value={this.state.package.description} 
                        onChange={this._handlePackageFieldUpdate}/>
                  </label>
                </div>

                <div>
                    <label htmlFor="price">
                        Price
                        <input id="price" className="width-20" type="number" value={this.state.package.price} 
                            onChange={this._handlePackageFieldUpdate}/>
                    </label>
                </div>

                <div>
                    <label htmlFor="active">
                        <input id="active" type="checkbox" defaultChecked={this.state.package.active} 
                            onChange={this._handlePackageFieldUpdate}/>
                        Is Active
                    </label>
                </div>

              <button type="submit" className="btn btn-blue">Save</button>
            </form>
        );
    }
});

Package.contextTypes = {
    router: React.PropTypes.func.isRequired
};

module.exports = Package;
