import React from 'react';
import moment from 'moment';

export default class AddSessionView extends React.Component {
    constructor(props) {
        super(props);
        let m = this._getMomentFromTime(props.sessionDatetime);
        this.state = {
            studentId: props.studentId,
            instructorId: props.instructorId,
            sessionDatetime: props.sessionDatetime,
            selectedDateTime: (this.props.sessionDatetime && m.isValid()) ? m : null
        };
    }
    _getMomentFromTime(value) {
        return moment(value, ['HH:mm', 'h:mm a', 'M/D/YYYY HH:mm', 'M/D/YYYY h:mm a', 'M-D-YYYY h:mm a'], true);
    }
    _onStudentSelected(event) {
        this.setState({studentId: event.target.value});
    }

    _onInstructorSelected(event) {
        this.setState({instructorId: event.target.value});
    }

    _onDateTimeChanged(event) {
        let selectedDateTime = this._getMomentFromTime(event.target.value);
        this.setState({
            sessionDatetime: event.target.value,
            selectedDateTime
        });
    }

    _onSave(event) {
        event.preventDefault();
        this.props.onSave({
            studentId: this.state.studentId,
            instructorId: this.state.instructorId,
            sessionDatetime: this.state.selectedDateTime.toDate()
        });
    }

    _isValid() {
        return (this.state.studentId 
            && this.state.instructorId 
            && this.state.selectedDateTime 
            && this.state.selectedDateTime.isValid());
    }

    render() {
        let studentOptions = this.props.students.map(function(s) {
            return (<option key={s.id} value={s.id}>{s.fullName}</option>);
        });
        let instructorOptions = this.props.instructors.map(function(i) {
            return (<option key={i.id} value={i.id}>{i.fullName}</option>);
        });
        let dt = this.state.selectedDateTime;
        let selectedDateTimePreview = (dt && dt.isValid()) ? dt.calendar(null, {sameElse: 'M/D/YYYY h:mm a'}) : '';
        return (
            <form className="forms p2 fit">
                <div className="flex flex-end">
                    <div className="flex-grow mr2">
                        <label>Student</label>
                        <select className="block mb1 field col-12" 
                            value={this.state.studentId} 
                            onChange={(event) => this._onStudentSelected(event)}>
                            <option>-- select --</option>
                            {studentOptions}
                        </select>
                    </div>
                    <div className="flex-grow mr2">
                        <label>Instructor</label>
                        <select className="block mb1 field col-12"
                            value={this.state.instructorId}  
                            onChange={(event) => this._onInstructorSelected(event)}>
                            <option>-- select --</option>
                            {instructorOptions}
                        </select>
                    </div>

                    <div className="flex-grow mr2">
                        <label>Appointment Date and Time <span className="regular muted caps h6">MM/DD/YYYY HH:MM</span></label>
                        <div className="relative">
                            <input type="date" placeholder="1/15/2016 12:30 PM" 
                                className="block mb1 field col-12"
                                value={this.state.sessionDatetime} 
                                onChange={(event) => this._onDateTimeChanged(event)}/>
                            <span className="absolute">
                                {selectedDateTimePreview}
                            </span>
                        </div>
                    </div>

                    <div className="p1 flex-none">
                        <button type="submit" className="btn btn-primary" disabled={!this._isValid()} onClick={(event) => this._onSave(event)}>Save</button>
                        <button type="reset" className="btn">Cancel</button>
                    </div>
                </div>
            </form>
        );
    }
}
