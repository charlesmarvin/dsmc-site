import React from 'react';
import moment from 'moment';

export default class Day extends React.Component {
    constructor(props) {
        super(props);
    }

    formatSessionDetails(session) {
        let sessionTime = moment(session.sessionDateTime).format('LT');
        return `${session.instructorFullName} is scheduled to instruct ${session.studentFullName} at ${sessionTime}`;
    }

    render() {
        let todayClass = (this.props.isToday ? ' today bold bg-darken-2' : '');
        let differentMonthClass = (this.props.isCurrentMonth ? '' : ' different-month silver');
        let selectedDateClass = (this.props.isSelected ? ' selected bg-darken-1' : '');
        let activity = <span>&nbsp;</span>;
        if (this.props.sessions.length) {
            let sessionDetails = this.props.sessions.map(this.formatSessionDetails).join('. ');
            activity = <span className="h3 green tooltip" title={sessionDetails}>&#9679;</span>;
        }
        return (
            <td className={'p2 center day pb1' + differentMonthClass + selectedDateClass + todayClass} 
                onClick={() => this.props.select(this.props.date)}>
                {this.props.date.date()}<br/>
                {activity}
            </td>
        );
    }
}

Day.propTypes = {
    isCurrentMonth: React.PropTypes.bool,
    isSelected: React.PropTypes.bool,
    isToday: React.PropTypes.bool,
    date: React.PropTypes.object,
    sessions: React.PropTypes.arrayOf(React.PropTypes.object),
    select: React.PropTypes.func
};
