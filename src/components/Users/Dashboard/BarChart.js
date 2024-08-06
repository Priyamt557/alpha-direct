import Chart from 'chart.js/auto';

import { Bar } from 'react-chartjs-2';

import { useEffect, useRef, useState } from 'react';
import { BarChartGetDataset1, BarChartGetDataset2, BarChartGetLabels, calculateMyGrowth } from '../../utilities/helpers';
import { months } from '../../utilities/constants';


const options = {
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      ticks: false
    },
    y: {
      ticks: {
        stepSize: 5,
        color: '#C2C2C2'
      }
    }
  },
  maintainAspectRatio: false
};

function BarChart({ selectedBarChartDate, userData, barChartData }) {
  const [chartData, setChartData] = useState(setdata());


  function setdata() {
    let labels = BarChartGetLabels(barChartData, selectedBarChartDate)
    labels = labels.sort((a, b) => parseInt(a) - parseInt(b)).filter((item, index) => labels.indexOf(item) === index);
    let Dataset1 = BarChartGetDataset1(barChartData, selectedBarChartDate, userData, labels);
    let Dataset2 = BarChartGetDataset2(barChartData, selectedBarChartDate, userData, labels);

    const editLabels = (arr) => {
      let month = selectedBarChartDate.slice(-2);
      month = parseInt(month);
      month = months[month - 1];
      month = month.slice(0, 3)
      let resulting_array = arr.map((item, index) => {
        return `${item + " " + month}`
      })
      return resulting_array
    }




    return ({
      labels: editLabels(labels),
      datasets: [
        {
          data: Dataset1,
          backgroundColor: ['#D0DDFF'],
          hoverBackgroundColor: ['#1755F9']
        },
        {
          data: Dataset2,
          backgroundColor: ['#D0DDFF'],
          hoverBackgroundColor: ['#F58427']
        }
      ]
    })
  }




  useEffect(() => {
    setChartData(setdata())
  }, [selectedBarChartDate, barChartData])

  return <Bar data={chartData} options={options} />;
}
export default BarChart;
