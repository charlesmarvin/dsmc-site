import React from 'react';
import Services from 'app/common/Services';
import _ from 'lodash';

export default class CourseEditView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            package: {}
        };
        this._handlePackageFieldUpdate = this._handlePackageFieldUpdate.bind(this);
        this._handleSave = this._handleSave.bind(this);
    }
    
    componentWillMount() {
        var {id} = this.props.params;
        if (!(_.isEmpty(id) || id === 'new')) {
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
        if (_.isEmpty(this.state.id)) {
            Services.createPackage(this.state.package);
        } else {
            Services.updatePackage(this.state.id, this.state.package);
        }
        this.props.history.pushState(null, 'packages');
    }
    
    render() {
        return (
             <form className="forms md-col-6 p2" onSubmit={this._handleSave} noValidate>
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

              <button type="submit" className="btn btn-primary">Save</button>
              <button type="reset" className="btn">Cancel</button>
            </form>
        );
    }
}
