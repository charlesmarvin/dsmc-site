import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import _ from 'lodash';
import Highcharts from 'react-highcharts/dist/bundle/highcharts';
import DashboardActions from '../actions/DashboardActions';
import DashboardStore from '../stores/DashboardStore';

const baseChartConfig = {
    chart: {
        height: 144
    },
    title: {
        text: null
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Students',
        type: 'pie',
        innerSize: '75%',
        dataLabels: {
            distance: 1
        },
        colors: [
            '#C83737',
            '#2F4986',
            '#C87937',
            '#9467bd',
            '#8c564b',
            '#e377c2',
            '#7f7f7f',
            '#217878',
            '#bcbd22',
            '#17becf'
        ],
        data: []
    }]
};

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            studentsByGenderCount: {},
            studentsByPackageCount: {},
            studentsByInstructorCount: {},
            students: []
        };
        this._onDashboardDataChanged = this._onDashboardDataChanged.bind(this);
    }

    componentWillMount() {
        DashboardStore.addChangeListener(this._onDashboardDataChanged);
    }

    componentDidMount() {
        DashboardActions.loadDashboardData();
    }
    
    componentWillUnmount() {
        DashboardStore.removeChangeListener(this._onDashboardDataChanged);
    }

    _onDashboardDataChanged() {
        this.setState({
            loading: DashboardStore.isLoading,
            studentsByGenderCount: DashboardStore.studentsByGenderCount,
            studentsByPackageCount: DashboardStore.studentsByPackageCount,
            studentsByInstructorCount: DashboardStore.studentsByInstructorCount,
            students: DashboardStore.students
        });
    }

    render() {
        let studentsByGender = this.state.studentsByGenderCount;
        let chart1 = _.cloneDeep(baseChartConfig);
        let nameAlias = {'M': 'Men', 'F': 'Women'};
        _.keys(studentsByGender).forEach(function(key) {
            chart1.series[0].data.push({name: nameAlias[key], y: studentsByGender[key]});
        });

        let studentsByPackage = this.state.studentsByPackageCount;
        let chart2 = _.cloneDeep(baseChartConfig);
        _.keys(studentsByPackage).forEach(function(key) {
            chart2.series[0].data.push({name: key, y: studentsByPackage[key]});
        });

        let studentsByInstructor = this.state.studentsByInstructorCount;
        let chart3 = _.cloneDeep(baseChartConfig);
        _.keys(studentsByInstructor).forEach(function(key) {
            chart3.series[0].data.push({name: key, y: studentsByInstructor[key]});
        });

        let infoCards = this.state.students.map((s) => {
            let addressLine2 = _.isEmpty(s.addressLine2) ? '' : <span>{s.addressLine2} <br/></span>;
            return (
                <column cols="3" key={s.id}>
                    <div className="info-card">
                        <address>
                            <strong className="big">{s.firstName} {s.lastName}</strong><br/>
                            {s.primaryPhone}<br/>
                            {s.email}<br/><br/>
                            {s.addressLine1}<br/>
                            {addressLine2}
                            {s.city}, {s.state} {s.zipcode}<br/>
                        </address>
                    </div>
                </column>
            );
        });
        return (
            <div>
                <blocks cols="3">
                    <div>
                        <div>
                            <Highcharts config={chart1} ref="studentsByGenderChart"/>
                        </div>
                        <Link to="students" className="dashboard-launcher students">
                            <h1 className="title">
                                Students
                            </h1>
                            <p className="caption">
                                Add new students and manage info on existing ones 
                            </p>
                        </Link>
                    </div>

                    <div>
                        <div>
                            <Highcharts config={chart2} ref="packagesByStudentsChart"/>
                        </div>
                        <Link to="packages" className="dashboard-launcher packages">
                            <h1 className="title">
                                Packages
                            </h1>
                            <p className="caption">
                                Manage details about offered licensing packages 
                            </p>
                        </Link>
                    </div>

                    <div>
                        <div>
                            <Highcharts config={chart3} ref="instructorsByStudentsChart"/>
                        </div>
                        <Link to="instructors" className="dashboard-launcher instructors">
                            <h1 className="title">
                                Instructors
                            </h1>
                            <p className="caption">
                                Add and update information for affiliated instructors
                            </p>
                        </Link>
                    </div>
                </blocks>

                <row>
                    {infoCards}
                </row>
            </div>
        );
    }
}
