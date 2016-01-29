import React from 'react';
import moment from 'moment';

export default class AddSessionView extends React.Component {
    constructor(props) {
        super(props);
        let dt = this._getMomentFromTime(props.sessionDatetime);
        this.state = {
            studentId: props.studentId,
            instructorId: props.instructorId,
            sessionDatetime: props.sessionDatetime,
            selectedDateTime: (this.props.sessionDatetime && dt.isValid()) ? dt : null
        };
    }
    _getMomentFromTime(value) {
        return moment(value, [
            'HH:mm', 
            'h:mm a', 
            'M/D/YYYY HH:mm', 
            'M/D/YYYY h:mm a', 
            'M-D-YYYY h:mm a', 
            'YYYY-MM-DDTHH:mm:ss', 
            'YYYY-MM-DDTHH:mm'
        ], true);
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
        this._clear();
    }
    _onCancel(event) {
        event.preventDefault();
        this._clear();
    }
    _clear() {
        this.setState({
            studentId: '',
            instructorId: '',
            sessionDatetime: null,
            selectedDateTime: null
        });
    }

    _isValid() {
        return (this.state.studentId 
            && this.state.instructorId 
            && this.state.selectedDateTime 
            && this.state.selectedDateTime.isValid());
    }

    _renderStudentOptions() {
        return this.props.students.map(function(s) {
            return <option key={s.id} value={s.id}>{s.fullName}</option>;
        });
    }

    _renderInstructorOptions() {
        return this.props.instructors.map(function(i) {
            return <option key={i.id} value={i.id}>{i.fullName}</option>;
        });
    }

    render() {
        let dt = this.state.selectedDateTime;
        let selectedDateTimePreview = (dt && dt.isValid()) ? 
            dt.calendar(null, {sameElse: 'M/D/YYYY h:mm a'}) : '';
        return (
            <form className="forms p2 fit" noValidate>
                <div className="flex flex-wrap flex-end">
                    <div className="md-col-3 p1">
                        <label>Student</label>
                        <select className="block mb1 field col-12" 
                            value={this.state.studentId} 
                            onChange={(event) => this._onStudentSelected(event)}>
                            <option>-- select --</option>
                            {this._renderStudentOptions()}
                        </select>
                    </div>
                    <div className="md-col-3 p1">
                        <label>Instructor</label>
                        <select className="block mb1 field col-12"
                            value={this.state.instructorId}  
                            onChange={(event) => this._onInstructorSelected(event)}>
                            <option>-- select --</option>
                            {this._renderInstructorOptions()}
                        </select>
                    </div>

                    <div className="md-col-3 p1">
                        <label>Appointment Date and Time</label>
                        <div className="relative">
                            <input className="block mb1 field col-12"
                                type="datetime-local" 
                                placeholder="1/15/2016 12:30 PM" 
                                value={this.state.sessionDatetime} 
                                onChange={(event) => this._onDateTimeChanged(event)}/>
                            <span className="absolute">
                                {selectedDateTimePreview}
                            </span>
                        </div>
                    </div>

                    <div className="flex-none p2">
                        <button type="submit" className="btn btn-primary" disabled={!this._isValid()} 
                            onClick={(event) => this._onSave(event)}>Save</button>
                        <button type="reset" className="btn" 
                            onClick={(event) => this._onCancel(event)}>Cancel</button>
                    </div>
                </div>
            </form>
        );
    }
}

AddSessionView.propTypes = {
    studentId: React.PropTypes.any,
    instructorId: React.PropTypes.any,
    sessionDatetime: React.PropTypes.object,
    students: React.PropTypes.arrayOf(React.PropTypes.object),
    instructors: React.PropTypes.arrayOf(React.PropTypes.object),
    onSave: React.PropTypes.func.isRequired
};
