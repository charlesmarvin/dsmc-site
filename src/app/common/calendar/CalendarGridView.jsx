import React from 'react';
import moment from 'moment';
import Week from './Week';
import DayNamesHeader from './DayNamesHeader';

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
        this.setState({month});
    }

    _next() {
        var month = this.state.month;
        month.add(1, 'M');
        this.setState({month});
    }

    _select(date) {
        this.setState({selected: date});
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
                        <DayNamesHeader/>
                    </thead>
                    <tbody>
                        {this._renderWeeks()}
                    </tbody>
                </table>
            </div>
        );
    }
}

CalendarGridView.propTypes = {
    selected: React.PropTypes.object,
    sessions: React.PropTypes.arrayOf(React.PropTypes.object)
};
