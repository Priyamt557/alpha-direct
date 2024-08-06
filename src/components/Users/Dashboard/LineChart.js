import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { DateFormatYearMonth, setLineData } from '../../utilities/helpers';

const LineGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false
  },
  stacked: false,
  plugins: {
    title: {
      display: false
    },
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      ticks: {
        stepSize: 10,
        color: '#C2C2C2'
      }
    },
    x: {
      ticks: false
    }
  }
};


function LineChart({ setYourGroth, compareWith, userData, barChartData }) {
  const [selectedBarChartDate, setSelectedBarChartDate] = useState(DateFormatYearMonth());
  const [LineDataState, setLineDateState] = useState(setLineData(userData, selectedBarChartDate, barChartData, compareWith, setYourGroth));


  useEffect(() => {
    setLineDateState(setLineData(userData, selectedBarChartDate, barChartData, compareWith, setYourGroth))
  }, [userData, barChartData, compareWith])

  return (
    <div className="h-48">
      <Line options={LineGraphOptions} data={LineDataState} />
    </div>
  );
}
export default LineChart;
