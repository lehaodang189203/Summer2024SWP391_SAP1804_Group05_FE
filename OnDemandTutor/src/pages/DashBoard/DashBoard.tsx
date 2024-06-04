import { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const Dashboard = () => {
    useEffect(() => {
        // Revenue chart configuration
        const revenueChartOptions = {
            series: [{
                name: 'Revenue',
                data: [300, 400, 500, 600, 700, 800, 900, 1000]
            }],
            chart: {
                height: 300,
                type: 'line',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            stroke: {
                curve: 'smooth'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#E91E63'],
                    inverseColors: true,
                    opacityFrom: 0.8,
                    opacityTo: 0.2,
                    stops: [0, 100]
                }
            },
            markers: {
                size: 0
            },
            tooltip: {
                theme: 'dark',
                x: { show: false },
                y: {
                    formatter: function (y: number) {
                        if (typeof y !== "undefined") {
                            return "$" + y.toFixed(0);
                        }
                        return y;
                    }
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                labels: {
                    style: {
                        colors: ['#333'],
                        fontSize: '14px'
                    }
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: ['#333'],
                        fontSize: '14px'
                    }
                }
            }
        };

        // Render revenue chart
        const revenueChart = new ApexCharts(document.querySelector('#revenue-chart'), revenueChartOptions);
        revenueChart.render();

        // Cleanup function to destroy the chart instance when component unmounts
        return () => {
            revenueChart.destroy();
        };
    }, []);

    // Mock data
    const students = ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5'];
    const tutors = ['Tutor 1', 'Tutor 2', 'Tutor 3', 'Tutor 4', 'Tutor 5'];
    const requests = [
        { student: 'Student 1', subject: 'Math', status: 'Pending' },
        { student: 'Student 2', subject: 'Physics', status: 'Approved' },
        { student: 'Student 3', subject: 'Chemistry', status: 'Pending' },
        { student: 'Student 4', subject: 'Biology', status: 'Pending' },
        { student: 'Student 5', subject: 'English', status: 'Approved' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex">
                <div className="w-1/8 bg-blue-100 p-4">
                    <ul className="space-y-4">
                        <li className="nav-item">
                            <a href="#" className="nav-link text-black hover:text-gray-700">Students</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link text-black hover:text-gray-700">Tutors</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link text-black hover:text-gray-700">Requests</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link text-black hover:text-gray-700">Revenue</a>
                        </li>
                    </ul>
                </div>
                <div className="w-3/4 p-4">
                    <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Students</h2>
                            <ul className="divide-y divide-gray-200">
                                {students.map((student, index) => (
                                    <li key={index} className="py-2">{student}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Tutors</h2>
                            <ul className="divide-y divide-gray-200">
                                {tutors.map((tutor, index) => (
                                    <li key={index} className="py-2">{tutor}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">Student Requests</h2>
                        <ul className="divide-y divide-gray-200">
                            {requests.map((request, index) => (
                                <li key={index} className="py-2">{request.student} - {request.subject} ({request.status})</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">Revenue</h2>
                        <div id="revenue-chart"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
