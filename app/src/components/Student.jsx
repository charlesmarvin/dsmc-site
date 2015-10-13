var React = require('react');
var HTTP = require('utils/HTTP');
var Formatters = require('utils/Formatters');

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
        var {id} = this.context.router.getCurrentParams();
        if (id !== 'new') {
            this.setState({id});
            HTTP.get('/api/v1/students/' + id, function(data) {
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
        var endpoint = '/api/v1/students';
        if (this.state.id === 'new') {
            HTTP.post(endpoint, this.state.student);
        } else {
            endpoint = endpoint + '/' + this.state.id;
            HTTP.put(endpoint, this.state.student);
        }
        this.context.router.transitionTo('students');
    },
    render() {
        return (
            <form className="forms unit-padding" onSubmit={this._handleSave}>
                <div className="units-row">
                    <div className="unit-33">
                        <label htmlFor="first-name">
                        First Name
                            <input id="firstName" className="width-100" type="text" 
                                value={this.state.student.firstName} 
                                onChange={this._handleStudentFieldUpdate}/>
                        </label>
                    </div>

              <div className="unit-33">
                <label htmlFor="last-name">
                  Last Name
                  <input id="lastName" className="width-100" type="text" 
                    value={this.state.student.lastName} 
                    onChange={this._handleStudentFieldUpdate}/>
                </label>
              </div>

              <div className="unit-33">
                <div className="unit-50">
                  <label htmlFor="dob">
                    Date of Birth
                    <input id="dob" className="width-100" type="date" required 
                        value={Formatters.date(this.state.student.dob, 'YYYY-MM-DD')} 
                        onChange={this._handleStudentFieldUpdate}/>
                  </label>
                </div>
                <div className="unit-50">
                  <label htmlFor="gender">
                    Gender
                    <select id="gender" className="" value={this.state.student.gender} 
                        onChange={this._handleStudentFieldUpdate}>
                      <option value="unknown">- Select -</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div className="units-row">
              <div className="unit-33">
                <label htmlFor="email">
                  E-Mail
                  <input id="email" className="width-100" type="email" required 
                    value={this.state.student.email} 
                    onChange={this._handleStudentFieldUpdate}/>
                </label>
              </div>

              <div className="unit-33">
                <label htmlFor="primaryPhone">
                  Primary Phone
                  <input id="primaryPhone" className="width-100" type="phone" 
                    value={this.state.student.primaryPhone} 
                    onChange={this._handleStudentFieldUpdate}/>
                </label>
              </div>

              <div className="unit-33">
                <label htmlFor="secondaryPhone">
                  Secondary Phone
                  <input id="secondaryPhone" className="width-100" type="phone" 
                    value={this.state.student.secondaryPhone} 
                    onChange={this._handleStudentFieldUpdate}/>
                </label>
              </div>
            </div>

            <div className="units-row">
              <div className="unit-35">
                <label htmlFor=" line1">
                  Address 1
                  <input id="line1" className="width-100" type="text" 
                    value={this.state.student.address.line1} 
                    onChange={this._handleAddressFieldUpdate}/>
                </label>
              </div>

              <div className="unit-20">
                <label htmlFor="line2">
                  Address 2
                  <input id="line2" className="width-100" type="text" 
                    value={this.state.student.address.line2} 
                    onChange={this._handleAddressFieldUpdate}/>
                </label>
              </div>

              <div className="unit-20">
                <label htmlFor="city">
                  City
                  <input id="city" className="width-100" type="text" 
                    value={this.state.student.address.city} 
                    onChange={this._handleAddressFieldUpdate}/>
                </label>
              </div>

              <div className="unit-10">
                <label htmlFor="state">
                  State
                  <select id="state" className="" value={this.state.student.address.state} 
                    onChange={this._handleAddressFieldUpdate}>
                    <option>AL</option>
                    <option>CA</option>
                    <option>NY</option>
                    <option>NJ</option>
                    <option>PA</option>
                  </select>
                </label>
              </div>

              <div className="unit-10">
                <label htmlFor="zipcode">
                  Zipcode
                  <input id="zipcode" className="width-100" type="text" 
                    value={this.state.student.address.zipcode} 
                    onChange={this._handleAddressFieldUpdate}/>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-blue">Save</button>
          </form>
        );
    }
});

Student.contextTypes = {
    router: React.PropTypes.func.isRequired
};

module.exports = Student;
