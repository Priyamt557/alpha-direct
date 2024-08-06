import { useEffect, useState } from 'react';
import Avatar from '../../utilities/Avatar';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { ReactComponent as PrizeIcon } from '../../../assets/images/price1.svg';
import { useCallback } from 'react';
import { getBonus, getRange } from '../../utilities/helpers';


function ProgressCards({ dashboardData, sales }) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };

  }, [window.innerWidth])
  const [activeCard, setActiveCard] = useState(null);

  const data = [
    {
      id: 1,
      title: 'Daily Progress',
      progressNumber: dashboardData?.todaypolicy?.length ? dashboardData?.todaypolicy?.length : 0,
      percent: dashboardData?.todaypolicy?.length ? ((dashboardData?.todaypolicy?.length) * 100) / 10 : 0,
      primaryColor: 'blue-600',
      secondaryColor: 'blue-600',
      range: getRange("Daily Progress", dashboardData?.todaypolicy?.length)
    },
    {
      id: 2,
      title: 'Monthly',
      progressNumber: dashboardData?.monthlypolicy?.length ? dashboardData?.monthlypolicy?.length : 0,
      percent: dashboardData?.monthlypolicy?.length ? ((dashboardData?.monthlypolicy?.length) * 100) / dashboardData?.monnthlyPoliciesGiven : 0,
      primaryColor: 'blue-600',
      secondaryColor: 'red-600',
      range: getRange("Monthly", dashboardData?.monthlypolicy?.length)
    },
    {
      id: 3,
      title: 'All Time',
      progressNumber: dashboardData?.alltimepolicy?.length ? dashboardData?.alltimepolicy?.length : 0,
      percent: dashboardData?.alltimepolicy?.length ? ((dashboardData?.alltimepolicy?.length) * 100) / dashboardData?.allTimePoliciesGiven : 0,
      primaryColor: 'alpha-secondary',
      secondaryColor: 'green-500',
      range: getRange("All Time", dashboardData?.alltimepolicy?.length)

    }
  ];



  useEffect(() => {
    setActiveCard(data[0])

  }, [dashboardData])




  const getBonuses = useCallback(() => {
    return getBonus(activeCard, sales, dashboardData)
  }, [activeCard])

  return (
    <div>
      <div className="mx-auto py-4 px-4  max-w-2xl gap-x-4 rounded-2xl lg:gap-8  bg-white">
        <div className="flex justify-between ">
          <div className="text-base leading-7">
            <h3 className="font-bold text-alpha-primary font-['SpaceGroteskBold']">
              {activeCard?.title}
            </h3>
            <p className="text-gray-400 font-semibold text-xs font-['SpaceGroteskBold']">
              You're in the zone! Keep the momentum—
              <br />
              success is within your reach.
            </p>
          </div>
          <div className="text-base leading-7">
            <h3 className="font-bold text-xs sm:text-sm text-gray-400 font-[TTNormsProRegular]">

              {activeCard?.title === 'Daily Progress' ? "TOTAL DAILY BONUS: " : activeCard?.title === "Monthly" ? "TOTAL MONTHLY BONUS: " : "TOTAL ALL TIME BONUS: "}
              <span
                className="ml-auto w-20 min-w-max whitespace-nowrap rounded-full bg-blue-600 px-2.5 py-0.5 text-center text-sm font-bold leading-5 text-white"
                aria-hidden="true"
              >
                {/* P50 */}
                {getBonuses()?.bonus}
              </span>
            </h3>
          </div>
        </div>
        <div className="flex pt-10 w-full">
          <div className="basis-5/6 relative ml-5">
            <div className="flex pt-16 mb-2 font-['TTNormsProRegular'] ">
              <div
                className={`pb-2 w-full absolute bottom-12 left-[-50%] h-full transform transition ease-in-out duration-300`}
                style={{ transform: `translateX(${activeCard?.percent}%)` }}
              >
                <h4
                  className={`text-base font-bold text-${activeCard?.secondaryColor} py-2 text-center`}
                >

                  {activeCard?.progressNumber}({(((activeCard?.progressNumber) * 100) / getBonuses()?.range[1]).toFixed(2)}%)
                </h4>
                <Avatar />
                <div className="flex justify-center mt-[2px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                  >
                    <path
                      d="M13.8719 0.532883H0.682062H0.490906L7.18138 8.81633L13.8719 0.532883Z"
                      fill="#33325D"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div
                className={`h-2 rounded-full bg-${activeCard?.primaryColor}`}
                style={{ width: `${activeCard?.percent}%` }}
              ></div>
            </div>
            <div className="flex  justify-between mt-2 font-['SpaceGroteskMedium']">
              <span className="text-base font-medium text-gray-300">{getBonuses()?.range[0]}</span>
              <span className="text-sm font-medium text-gray-300">
                {getBonuses()?.range[1]}</span>
            </div>
          </div>
          <div className="basis-1/6">
            <PrizeIcon className="m-auto" />
          </div>
        </div>
      </div>
      <div className={`flex ${width < 1050 && 'mx-auto max-w-2xl rounded-2xl'} gap-x-4`}>
        {data?.map((card, index) => {
          return (
            <div
              key={index}
              className={`mx-auto mt-4 py-2 px-4 max-w-2xl gap-x-4 rounded-2xl bg-white w-full ${activeCard?.id == card.id ? 'hidden' : ''
                }`}
            >
              <div className="text-base leading-7 font-['TTNormsProRegular']">
                <div className="flex justify-between ">
                  <h3 className={`font-bold text-sm text-${card.primaryColor}`}>
                    {card.title}
                  </h3>
                  <div
                    className="p-1 text-gray-600 hover:bg-slate-100 rounded"
                    onClick={() => setActiveCard(card)}
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 cursor-pointer" />
                  </div>
                </div>

                <h1 className={`font-bold text-xl sm:text-5xl text-${card.primaryColor}`}>
                  {card.progressNumber}
                </h1>
                <p
                  className={`sm:text-lg text-${card.secondaryColor} w-full text-right -mt-4 font-extrabold font-['TTNormsProBold']`}
                >



                  {(((card?.progressNumber) * 100) / card?.range[1]).toFixed(2)}%

                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className={`bg-${card.primaryColor} h-2 rounded-full`}
                    style={{ width: `${card.percent > 100 ? 100 : card.percent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressCards;
