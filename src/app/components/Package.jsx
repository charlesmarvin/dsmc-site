import React from 'react';
import Services from './Services';
import _ from 'lodash';

export default class Package extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 'new',
            package: {}
        };
    }
    
    componentWillMount() {
        var {id} = this.props.params;
        if (!_.isEmpty(id) && id !== 'new') {
            this.setState({id});
            Services.getPackage(id).then(function(data) {
                this.setState({package: data});
            }.bind(this));
        }
    }
    
    _handlePackageFieldUpdate(event) {
        this.state.package[event.target.id] = (event.target.type === 'checkbox') ? 
            event.target.checked : event.target.value;
        this.setState({package: this.state.package});
    }
    
    _handleSave(event) {
        event.preventDefault();
        if (this.state.id === 'new') {
            Services.createPackage(this.state.package);
        } else {
            Services.updatePackage(this.state.id, this.state.package);
        }
        this.context.router.transitionTo('packages');
    }
    
    render() {
        return (
             <form className="forms unit-padding" onSubmit={this._handleSave} noValidate>
                  <label htmlFor="name">
                    Package Name <span className="red">*</span>
                </label>
                    <input id="name" type="text" 
                        value={this.state.package.name} 
                        className="block col-12 mb1 field"
                        onChange={this._handlePackageFieldUpdate}/>
                  
                  <label htmlFor="description">
                    Description</label>
                    <textarea id="description" type="text" 
                        value={this.state.package.description} 
                        className="block col-12 mb1 field"
                        onChange={this._handlePackageFieldUpdate}/>
                  
                    <label htmlFor="price">
                        Price <span className="red">*</span>
                        </label>
                        <input id="price" type="number" value={this.state.package.price} 
                            className="block col-2 mb1 field"
                            onChange={this._handlePackageFieldUpdate}/>

                    <label htmlFor="active" className="block col-12 mb2">
                        <input id="active" type="checkbox" defaultChecked={this.state.package.active} 
                            onChange={this._handlePackageFieldUpdate}/>
                        Is Active
                    </label>

              <button type="submit" className="btn btn-primary">Save</button>
            </form>
        );
    }
}

Package.propTypes = {
    params: React.PropTypes.func.isRequired
};
