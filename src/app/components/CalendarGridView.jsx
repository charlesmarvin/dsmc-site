import React from 'react';
import moment from 'moment';

export class Day extends React.Component {
    render() {
        let todayClass = (this.props.isToday ? ' today bold bg-darken-2' : '');
        let differentMonthClass = (this.props.isCurrentMonth ? '' : ' different-month silver');
        let selectedDateClass = (this.props.isSelected ? ' selected bg-darken-1' : '');
        let activity = (this.props.sessions.length) ? <span className="h3 green">&#9679;</span> : <span>&nbsp;</span>;
        return (
            <td className={'p2 center day pb1' + differentMonthClass + selectedDateClass + todayClass} 
                onClick={() => this.props.select(this.props.date)}>
                {this.props.date.date()}<br/>
                {activity}
            </td>
        );
    }
}

export class Week extends React.Component {
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
                day: date.format('dd').substring(0, 1),
                date: date,
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

export class DayNames extends React.Component {
    render() {
        return (
            <tr className="week names">
                <th className="day center">Sun</th>
                <th className="day center">Mon</th>
                <th className="day center">Tue</th>
                <th className="day center">Wed</th>
                <th className="day center">Thu</th>
                <th className="day center">Fri</th>
                <th className="day center">Sat</th>
            </tr>
        );
    }
}

export default class CalendarGridView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: props.selected.clone(),
            selected: props.selected,
            sessions: props.sessions
        };
    }

    _previous() {
        var month = this.state.month;
        month.add(-1, 'M');
        this.setState({ month: month });
    }

    _next() {
        var month = this.state.month;
        month.add(1, 'M');
        this.setState({ month: month });
    }

    _select(date) {
        this.setState({ selected: date });
    }

    _renderWeeks() {
        var weeks = [],
            done = false,
            date = this.state.month.clone().startOf('month').day('Sunday'),
            monthIndex = date.month(),
            count = 0;
        while (!done) {
            weeks.push(
                <Week key={date.toString()} 
                    date={date.clone()} 
                    month={this.state.month.month()} 
                    select={(selectedDate) => this._select(selectedDate)} 
                    selected={this.state.selected}
                    sessions={this.props.sessions} />
            );
            date.add(1, 'w');
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    }

    _renderMonthLabel() {
        return <h3 className="center mt1">{this.state.month.format('MMMM, YYYY')}</h3>;
    }

    render() {
        console.log('Rendering...');
        return (
            <div className="p2">
                <div className="clearfix p2">
                    <div className="col col-2">
                        <button className="btn btn-outline left blue" onClick={() => this._previous()}>&#10094;</button>
                    </div>
                    <div className="col col-8">
                        {this._renderMonthLabel()}
                    </div>
                    <div className="col col-2">
                        <button className="btn btn-outline right blue" onClick={() => this._next()}>&#10095;</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <DayNames />
                    </thead>
                    <tbody>
                        {this._renderWeeks()}
                    </tbody>
                </table>
            </div>
        );
    }
}
