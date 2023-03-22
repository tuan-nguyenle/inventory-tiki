import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
    labels: ['Kho đã sử dụng', 'Kho còn trống'],
    datasets: [
        {
            label: '% sử dụng',
            data: [20, 80], // Thay đổi giá trị tương ứng với kho sử dụng và kho còn trống của bạn
            backgroundColor: ['#060047', '#36A2EB'],
            hoverBackgroundColor: ['#060047', '#36A2EB'],
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
};

const MyChart = () => <Doughnut data={data} options={options} />;

export default MyChart;