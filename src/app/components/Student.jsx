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
          <div className="p2">
            <form className="forms md-col-6" onSubmit={this._handleSave}>
              <label htmlFor="first-name">First Name</label>
              <input id="firstName" type="text" required
                    className="block col-12 mb1 field"
                    value={this.state.student.firstName} 
                    onChange={this._handleStudentFieldUpdate}/>

              <label htmlFor="last-name">Last Name</label>
              <input id="lastName" type="text" required
                    className="block col-12 mb1 field"
                    value={this.state.student.lastName} 
                    onChange={this._handleStudentFieldUpdate}/>

              <label htmlFor="dob">Date of Birth <span className="small muted">YYYY-MM-DD</span></label>
              <input id="dob" type="text" required
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
                  <input id="email" type="email" required 
                    className="block col-12 mb1 field"
                    value={this.state.student.email} 
                    onChange={this._handleStudentFieldUpdate}/>

                <label htmlFor="primaryPhone">Primary Phone</label>
                  <input id="primaryPhone" type="tel"
                    className="block col-12 mb1 field" 
                    value={this.state.student.primaryPhone} 
                    onChange={this._handleStudentFieldUpdate}/>
              
                <label htmlFor="secondaryPhone">Secondary Phone</label>
                  <input id="secondaryPhone" type="tel"
                    className="block col-12 mb1 field" 
                    value={this.state.student.secondaryPhone}/>
              
                <label htmlFor="line1">
                  Street Address</label>
                  <input id="line1" type="text" 
                    className="block col-12 mb1 field"
                    value={this.state.student.addressLine1} 
                    onChange={this._handleStudentFieldUpdate}/>
              
                <label htmlFor="line2">Apartment/Suite #</label>
                  <input id="line2" type="text" 
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
                  <select id="state" 
                    className="block col-3 mb1 field"
                  value={this.state.student.state} 
                    onChange={this._handleStudentFieldUpdate}>
                    <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                  </select>
              
                <label htmlFor="zipcode">
                  Zipcode</label>
                  <input id="zipcode" type="text" 
                  className="block col-3 mb1 field"
                    value={this.state.student.zipcode} 
                    onChange={this._handleStudentFieldUpdate}/>
              

            <button type="submit" className="btn btn-primary mr1">Save</button>
            <button type="reset" className="btn">Cancel</button>
          </form>
        </div>
        );
    }
}

Student.propTypes = {
    params: React.PropTypes.object.isRequired
};
