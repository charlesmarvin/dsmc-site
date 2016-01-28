import React from 'react';
import _ from 'lodash';
import StatePicker from 'app/common/StatePicker';
import Services from 'app/common/Services';
import Formatters from 'app/common/utils/Formatters';
import RouterContainer from 'app/common/RouterContainer';

export default class StudentEditView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            student: {}
        };
        this._handleStudentFieldUpdate = this._handleStudentFieldUpdate.bind(this);
        this._handleSave = this._handleSave.bind(this);
    }
    
    componentWillMount() {
        var {id} = this.props.params;
        if (!(_.isEmpty(id) || id === 'new')) {
            this.setState({id});
            Services.getStudent(id).then(function(data) {
                this.setState({student: data});
            }.bind(this));
        }
    }
    
    _handleStudentFieldUpdate(event) {
        this.state.student[event.target.id] = event.target.value; 
        this.setState({student: this.state.student});
    }
    
    _handleSave(event) {
        event.preventDefault();
        if (_.isEmpty(this.state.id)) {
            Services.createStudent(this.state.student);
        } else {
            Services.updateStudent(this.state.id, this.state.student);
        }
        this.props.history.pushState(null, '/students');
    }
    
    render() {
        return (
            <form className="forms md-col-6 p2" onSubmit={this._handleSave} noValidate>
              <label htmlFor="first-name">First Name <span className="red">*</span></label>
              <input id="firstName" type="text" 
                    className="block col-12 mb1 field"
                    value={this.state.student.firstName} 
                    onChange={this._handleStudentFieldUpdate}/>

              <label htmlFor="last-name">Last Name <span className="red">*</span></label>
              <input id="lastName" type="text" 
                    className="block col-12 mb1 field"
                    value={this.state.student.lastName} 
                    onChange={this._handleStudentFieldUpdate}/>

              <label htmlFor="dob">Date of Birth <span className="red">*</span>
                <span className="small muted">YYYY-MM-DD</span></label>
              <input id="dob" type="text"
                    className="block col-4 mb1 field" 
                    value={this.state.student.dob} 
                    onChange={this._handleStudentFieldUpdate}/>

              <label htmlFor="gender">Gender</label>
              <select id="gender" className="" 
                      className="block col-4 mb1 field"
                      value={this.state.student.gender} 
                      onChange={this._handleStudentFieldUpdate}>
                <option value="">- Select -</option>
                <option value="F">Female</option>
                <option value="M">Male</option>
              </select>

            
                <label htmlFor="email">
                  E-Mail</label>
                  <input id="email" type="email"  
                    className="block col-12 mb1 field"
                    value={this.state.student.email} 
                    onChange={this._handleStudentFieldUpdate}/>

                <label htmlFor="primaryPhone">Primary Phone <span className="red">*</span></label>
                  <input id="primaryPhone" type="tel"
                    className="block col-12 mb1 field" 
                    value={this.state.student.primaryPhone} 
                    onChange={this._handleStudentFieldUpdate}/>
              
                <label htmlFor="secondaryPhone">Secondary Phone</label>
                  <input id="secondaryPhone" type="tel"
                    className="block col-12 mb1 field" 
                    value={this.state.student.secondaryPhone}
                    onChange={this._handleStudentFieldUpdate}/>
              
                <label htmlFor="addressLine1">
                  Street Address</label>
                  <input id="addressLine1" type="text" 
                    className="block col-12 mb1 field"
                    value={this.state.student.addressLine1} 
                    onChange={this._handleStudentFieldUpdate}/>
              
                <label htmlFor="addressLine2">Apartment/Suite #</label>
                  <input id="addressLine2" type="text" 
                  className="block col-12 mb1 field"
                    value={this.state.student.addressLine2} 
                    onChange={this._handleStudentFieldUpdate}/>
              
                <label htmlFor="city">
                  City</label>
                  <input id="city" type="text" 
                  className="block col-12 mb1 field"
                    value={this.state.student.city} 
                    onChange={this._handleStudentFieldUpdate}/>
              
                <label htmlFor="state">
                  State</label>
                <StatePicker id="state" 
                    className="block col-3 mb1 field"
                    value={this.state.student.state} 
                    onChange={this._handleStudentFieldUpdate}/>
              
                <label htmlFor="zipcode">
                  Zipcode</label>
                  <input id="zipcode" type="text" 
                  className="block col-3 mb1 field"
                    value={this.state.student.zipcode} 
                    onChange={this._handleStudentFieldUpdate}/>
              

            <button type="submit" className="btn btn-primary">Save</button>
            <button type="reset" className="btn">Cancel</button>
          </form>
        );
    }
}

StudentEditView.propTypes = {
    params: React.PropTypes.object,
    history: React.PropTypes.object
};
