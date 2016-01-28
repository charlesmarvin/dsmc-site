import React from 'react';

export default class DayNames extends React.Component {
    constructor(props) {
        super(props);
    }

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
