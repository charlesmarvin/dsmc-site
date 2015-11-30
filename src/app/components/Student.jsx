import React from 'react';
import Services from './Services';
import Formatters from 'utils/Formatters';

export default class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 'new',
            student: {}
        };
        this._handleStudentFieldUpdate = this._handleStudentFieldUpdate.bind(this);
        this._handleSave = this._handleSave.bind(this);
    }
    
    componentWillMount() {
        var {id} = this.props.params;
        if (id !== 'new') {
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
        if (this.state.id === 'new') {
            Services.createStudent(this.state.student);
        } else {
            Services.updateStudent(this.state.id, this.state.student);
        }
        this.context.router.transitionTo('/students');
    }
    
    render() {
        return (
            <form className="forms" onSubmit={this._handleSave}>
                <row>
                    <column cols="4">
                        <label htmlFor="first-name">
                        First Name</label>
                            <input id="firstName" type="text" 
                                value={this.state.student.firstName} 
                                onChange={this._handleStudentFieldUpdate}/>
                    </column>

              <column cols="4">
                <label htmlFor="last-name">
                  Last Name</label>
                  <input id="lastName" type="text" 
                    value={this.state.student.lastName} 
                    onChange={this._handleStudentFieldUpdate}/>
              </column>

              <column cols="4">
                <row>
                    <column cols="8">
                      <label htmlFor="dob">Date of Birth</label>
                      <input id="dob" type="text" required 
                        value={this.state.student.dob} 
                        onChange={this._handleStudentFieldUpdate}/>
                    </column>
                    <column cols="4">
                      <label htmlFor="gender">
                        Gender</label>
                        <select id="gender" className="" value={this.state.student.gender} 
                            onChange={this._handleStudentFieldUpdate}>
                          <option value="">- Select -</option>
                          <option value="F">Female</option>
                          <option value="M">Male</option>
                        </select>
                    </column>
                </row>
              </column>
            </row>

            <row>
              <column cols="4">
                <label htmlFor="email">
                  E-Mail</label>
                  <input id="email" type="email" required 
                    value={this.state.student.email} 
                    onChange={this._handleStudentFieldUpdate}/>
              </column>

              <column cols="4">
                <label htmlFor="primaryPhone">Primary Phone</label>
                  <input id="primaryPhone" type="tel" 
                    value={this.state.student.primaryPhone} 
                    onChange={this._handleStudentFieldUpdate}/>
              </column>

              <column cols="4">
                <label htmlFor="secondaryPhone">Secondary Phone</label>
                  <input id="secondaryPhone" type="tel" 
                    value={this.state.student.secondaryPhone} 
                    onChange={this._handleStudentFieldUpdate}/>
              </column>
            </row>

            <row>
              <column cols="4">
                <label htmlFor=" line1">
                  Address 1</label>
                  <input id="line1" type="text" 
                    value={this.state.student.addressLine1} 
                    onChange={this._handleStudentFieldUpdate}/>
              </column>

              <column cols="2">
                <label htmlFor="line2">
                  Address 2</label>
                  <input id="line2" type="text" 
                    value={this.state.student.addressLine2} 
                    onChange={this._handleStudentFieldUpdate}/>
              </column>

              <column cols="2">
                <label htmlFor="city">
                  City</label>
                  <input id="city" type="text" 
                    value={this.state.student.city} 
                    onChange={this._handleStudentFieldUpdate}/>
              </column>

              <column cols="1">
                <label htmlFor="state">
                  State</label>
                  <select id="state" className="" value={this.state.student.state} 
                    onChange={this._handleStudentFieldUpdate}>
                    <option>AL</option>
                    <option>CA</option>
                    <option>NY</option>
                    <option>NJ</option>
                    <option>PA</option>
                  </select>
              </column>

              <column cols="1">
                <label htmlFor="zipcode">
                  Zipcode</label>
                  <input id="zipcode" type="text" 
                    value={this.state.student.zipcode} 
                    onChange={this._handleStudentFieldUpdate}/>
              </column>
            </row>

            <button type="submit" className="btn btn-blue">Save</button>
          </form>
        );
    }
}

Student.propTypes = {
    params: React.PropTypes.object.isRequired
};
