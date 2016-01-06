import React from 'react';
import _ from 'lodash';
import StatePicker from './StatePicker';
import Services from './Services';
import Formatters from 'utils/Formatters';
import RouterContainer from '../services/RouterContainer';

export default class InstructorView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            instructor: {}
        };
        this._handleFieldUpdate = this._handleFieldUpdate.bind(this);
        this._handleSave = this._handleSave.bind(this);
    }
    
    componentWillMount() {
        var {id} = this.props.params;
        if (!(_.isEmpty(id) || id === 'new')) {
            this.setState({id});
            Services.getInstructor(id).then((data) => this.setState({instructor: data}) );
        }
    }
    
    _handleFieldUpdate(event) {
        this.state.instructor[event.target.id] = event.target.value; 
        this.setState({instructor: this.state.instructor});
    }
    
    _handleSave(event) {
        event.preventDefault();
        if (_.isEmpty(this.state.id)) {
            Services.createInstructor(this.state.instructor)
            	.then((r) => this.props.history.pushState(null, '/instructors'));
        } else {
            Services.updateInstructor(this.state.id, this.state.instructor);
        }
    }
    
    render() {
        return (
            <form className="forms md-col-6 p2" onSubmit={this._handleSave} noValidate>
              <label htmlFor="first-name">First Name <span className="red">*</span></label>
              <input id="firstName" type="text" 
                    className="block col-12 mb1 field"
                    value={this.state.instructor.firstName} 
                    onChange={this._handleFieldUpdate}/>

              <label htmlFor="last-name">Last Name <span className="red">*</span></label>
              <input id="lastName" type="text" 
                    className="block col-12 mb1 field"
                    value={this.state.instructor.lastName} 
                    onChange={this._handleFieldUpdate}/>

              <label htmlFor="certificationDate">Certification Date <span className="red">*</span>
                <span className="small muted">YYYY-MM-DD</span></label>
              <input id="certificationDate" type="text"
                    className="block col-4 mb1 field" 
                    value={this.state.instructor.certificationDate} 
                    onChange={this._handleFieldUpdate}/>
            
                <label htmlFor="email">
                  E-Mail</label>
                  <input id="email" type="email"  
                    className="block col-12 mb1 field"
                    value={this.state.instructor.email} 
                    onChange={this._handleFieldUpdate}/>

                <label htmlFor="primaryPhone">Primary Phone <span className="red">*</span></label>
                  <input id="primaryPhone" type="tel"
                    className="block col-12 mb1 field" 
                    value={this.state.instructor.primaryPhone} 
                    onChange={this._handleFieldUpdate}/>
              
                <label htmlFor="secondaryPhone">Secondary Phone</label>
                  <input id="secondaryPhone" type="tel"
                    className="block col-12 mb1 field" 
                    value={this.state.instructor.secondaryPhone}
                    onChange={this._handleFieldUpdate}/>
              
                <label htmlFor="addressLine1">
                  Street Address</label>
                  <input id="addressLine1" type="text" 
                    className="block col-12 mb1 field"
                    value={this.state.instructor.addressLine1} 
                    onChange={this._handleFieldUpdate}/>
              
                <label htmlFor="addressLine2">Apartment/Suite #</label>
                  <input id="addressLine2" type="text" 
                  className="block col-12 mb1 field"
                    value={this.state.instructor.addressLine2} 
                    onChange={this._handleFieldUpdate}/>
              
                <label htmlFor="city">
                  City</label>
                  <input id="city" type="text" 
                  className="block col-12 mb1 field"
                    value={this.state.instructor.city} 
                    onChange={this._handleFieldUpdate}/>
              
                <label htmlFor="state">
                  State</label>
                <StatePicker id="state" 
                    className="block col-3 mb1 field"
                    value={this.state.instructor.state} 
                    onChange={this._handleFieldUpdate}/>
              
                <label htmlFor="zipcode">
                  Zipcode</label>
                  <input id="zipcode" type="text" 
                  className="block col-3 mb1 field"
                    value={this.state.instructor.zipcode} 
                    onChange={this._handleFieldUpdate}/>
              

            <button type="submit" className="btn btn-primary">Save</button>
            <button type="reset" className="btn">Cancel</button>
          </form>
        );
    }
}
