import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getPercentage } from '../../utilities/helpers';



function DoughnutChart({ dashboardData }) {


  const doughnutData = (dashboardData) => {
    const obj = getPercentage(dashboardData)
    return ({
      labels: ['Complaints', 'NonComplaints', "Pending"],
      datasets: [
        {
          label: '',
          data: [obj?.kyccomp, obj?.nonokyccomp, obj?.pendingcomp],
          backgroundColor: ['#3AD049', '#EC3434', 'yellow']
        }
      ]
    })
  };

  const [data, setData] = useState(doughnutData(dashboardData));
  const [compPercentage, setCompPercentage] = useState(0)

  useEffect(() => {
    setData(doughnutData(dashboardData))
    setCompPercentage(getPercentage(dashboardData)?.kyccomp)
  }, [dashboardData])


  return (
    <div className="pt-1 w-40 flex items-center justify-center relative mx-auto">
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              display: true,
              position: 'center',
              labels: {
                boxWidth: 0,
                textAlign: 'center',
                color: 'green'
              }
            }
          },
          cutout: '87%'
        }}
      />
      <div className="absolute top-[50%] flex items-center justify-center mx-auto  left-[30%] traslate-x-[-50%] translate-y-[-50%]">
        <h1 className="font-bold text-4xl text-[#3AD049]">{Math.floor(compPercentage)}%</h1>
      </div>
    </div>
  );
}
export default DoughnutChart;
