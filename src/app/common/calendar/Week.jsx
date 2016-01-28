import React from 'react';
import moment from 'moment';
import Day from './Day';

export default class Week extends React.Component {
    constructor(props) {
        super(props);
    }

    _getSession(date) {
        return this.props.sessions.filter((s) => {
            return moment(s.sessionDateTime).isSame(date, 'day');
        });
    }

    render() {
        let days = [],
            date = this.props.date,
            month = this.props.month;
        
        for (let i = 0; i < 7; i++) {
            let day = {
                date,
                day: date.format('dd').substring(0, 1),
                isCurrentMonth: date.month() === this.props.month,
                isToday: date.isSame(new Date(), 'day'),
                isSelected: date.isSame(this.props.selected),
                sessions: this._getSession(date)
            };

            days.push(<Day key={day.date.toString()} {...day} select={this.props.select} />);
            date = date.clone();
            date.add(1, 'd');
        }

        return (
            <tr className="week" key={days[0].toString()}>
                {days}
            </tr>
        );
    }
}

Week.propTypes = {
    month: React.PropTypes.number,
    date: React.PropTypes.object,
    selected: React.PropTypes.object,
    sessions: React.PropTypes.arrayOf(React.PropTypes.object),
    select: React.PropTypes.func
};
