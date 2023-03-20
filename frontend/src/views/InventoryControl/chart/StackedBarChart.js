import React, { Component } from 'react';
import Chart from 'chart.js/auto';

class StackedBarChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart() {
        const chartRef = this.chartRef.current.getContext("2d");
        const chart = new Chart(chartRef, {
            type: "bar",
            data: {
                labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
                datasets: this.props.data,
            },
            options: {
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                    },
                },
            },
        });
    }

    render() {
        return <canvas ref={this.chartRef} />;
    }
}

export default StackedBarChart;