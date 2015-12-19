import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import _ from 'lodash';
import Highcharts from 'react-highcharts/dist/bundle/highcharts';
import DashboardActions from '../actions/DashboardActions';
import DashboardStore from '../stores/DashboardStore';
import Students from './Students';

const baseChartConfig = {
    chart: {
        type: 'pie',
        height: 256,
        margin: 0
    },
    title: {
        text: null
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        pie: {
            slicedOffset: 0,
            size: '90%',
            innerSize: '40%',
            dataLabels: {
                enabled: true,
                distance: -40
            }    
        }
    },
    series: [{
        name: 'Students',
        colors: [
            '#C83737',
            '#2F4986',
            '#17becf',
            '#C87937',
            '#bcbd22'
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

        return (
            <div>
                <div className="md-flex flex-justify">
                    <div className="flex-auto m2">
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

                    <div className="flex-auto m2">
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

                    <div className="flex-auto m2"> 
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
                </div>
                <Students/>
            </div>
        );
    }
}
