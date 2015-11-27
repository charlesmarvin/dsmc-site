import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import Highcharts from 'react-highcharts/dist/bundle/highcharts';
import Services from './Services';

export default class Dashboard extends React.Component {
    componentWillMount() {
        var agg = {male: 0, female: 0};
        Services.getDashboardContent().then(function(d) {
            let studentsByGender = d.studentsByGenderCount;
            let studentsByGenderChart = this.refs.studentsByGenderChart.getChart();
            studentsByGenderChart.series[0].addPoint({name: 'Men', y: studentsByGender.M});
            studentsByGenderChart.series[0].addPoint({name: 'Women', y: studentsByGender.F});
            
            let studentsByPackage = d.studentsByPackageCount;
            let packagesByStudentsChart = this.refs.packagesByStudentsChart.getChart();
            Object.keys(studentsByPackage).forEach(function(key) {
                packagesByStudentsChart.series[0].addPoint({name: key, y: studentsByPackage[key]});
            });
            
            let studentsByInstructor = d.studentsByInstructorCount;
            let instructorsByStudentsChart = this.refs.instructorsByStudentsChart.getChart();
            Object.keys(studentsByInstructor).forEach(function(key) {
                instructorsByStudentsChart.series[0].addPoint({name: key, y: studentsByInstructor[key]});
            });
            
        }.bind(this));
    }
    render() {
        var config = {
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
                    distance: 5
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
        return (
            <blocks cols="3">
                <div>
                    <div>
                        <Highcharts config={config} ref="studentsByGenderChart"/>
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
                        <Highcharts config={config} ref="packagesByStudentsChart"/>
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
                        <Highcharts config={config} ref="instructorsByStudentsChart"/>
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
        );
    }
}
