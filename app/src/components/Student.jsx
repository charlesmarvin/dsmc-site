import React from 'react';
import Services from './Services';
import Formatters from 'utils/Formatters';

var Student = React.createClass({
    getInitialState() {
        return {
            id: 'new',
            student: { 
                address: {}
            }
        };
    },
    componentWillMount() {
        var {id} = this.props.params;
        if (id !== 'new') {
            this.setState({id});
            Services.getStudent(id).then(function(data) {
                this.setState({student: data});
            }.bind(this));
        }
    },
    _handleStudentFieldUpdate(event) {
        this.state.student[event.target.id] = event.target.value; 
        this.setState({student: this.state.student});
    },
    _handleAddressFieldUpdate(event) {
        this.state.student.address[event.target.id] = event.target.value; 
        this.setState({student: this.state.student});
    },
    _handleSave(event) {
        event.preventDefault();
        if (this.state.id === 'new') {
            Services.createStudent(this.state.student);
        } else {
            Services.updateStudent(this.state.id, this.state.student);
        }
        this.context.router.transitionTo('/students');
    },
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
                        <row>
                            <column cols="4">
                                <label htmlFor="dob-year">
                                Year</label>
                                <input id="dob-year" type="number" required 
                                    value={Formatters.date(this.state.student.dob, 'YYYY')} 
                                    onChange={this._handleStudentFieldUpdate}/>
                            </column>
                            <column cols="4">
                                <label htmlFor="dob-month">
                                Month</label>
                                <input id="dob-month" type="number" required 
                                    value={Formatters.date(this.state.student.dob, 'MM')} 
                                    onChange={this._handleStudentFieldUpdate}/>
                            </column>
                            <column cols="4">
                                <label htmlFor="dob-day">
                                Day</label>
                                <input id="dob-day" type="number" required 
                                    value={Formatters.date(this.state.student.dob, 'DD')} 
                                    onChange={this._handleStudentFieldUpdate}/>
                            </column>
                        </row>
                    </column>
                    <column cols="4">
                      <label htmlFor="gender">
                        Gender</label>
                        <select id="gender" className="" value={this.state.student.gender} 
                            onChange={this._handleStudentFieldUpdate}>
                          <option value="unknown">- Select -</option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
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
                    value={this.state.student.address.line1} 
                    onChange={this._handleAddressFieldUpdate}/>
              </column>

              <column cols="2">
                <label htmlFor="line2">
                  Address 2</label>
                  <input id="line2" type="text" 
                    value={this.state.student.address.line2} 
                    onChange={this._handleAddressFieldUpdate}/>
              </column>

              <column cols="2">
                <label htmlFor="city">
                  City</label>
                  <input id="city" type="text" 
                    value={this.state.student.address.city} 
                    onChange={this._handleAddressFieldUpdate}/>
              </column>

              <column cols="1">
                <label htmlFor="state">
                  State</label>
                  <select id="state" className="" value={this.state.student.address.state} 
                    onChange={this._handleAddressFieldUpdate}>
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
                    value={this.state.student.address.zipcode} 
                    onChange={this._handleAddressFieldUpdate}/>
              </column>
            </row>

            <button type="submit" className="btn btn-blue">Save</button>
          </form>
        );
    }
});

module.exports = Student;
