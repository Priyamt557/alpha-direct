import React, { useCallback, useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import Slideshow from './Slideshow';
import Avatar from '../../utilities/Avatar';
import { ReactComponent as DashboardIcon } from '../../../assets/images/dashboardIcon.svg';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import LineChart from './LineChart';
import ProgressCards from './ProgressCards';
import { getAgentCommissions, getAllmyAgentsAndTopAgentOfMonth, getComparisonData, getComplianceRating, getDashboardData, getMyPolicies } from '../../../services/services';
import {
  DashboardGetComplianceRating,
  DashboardGetTotalPoliciesComparison,
  DateFormatYearMonth,
  calculateMyGrowth,
  isPastMonth
} from '../../utilities/helpers';





const Dashboard = ({ LogoutUser }) => {
  const [userData, setUserData] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [dashboardData, setDashboardData] = useState(null);
  const [search, setSearch] = useState('');
  const [foundAgents, setFoundAgents] = useState([]);
  const [compareWith, setCompareWith] = useState('');
  const [barChartData, setBarChartData] = useState(null);
  const [LineChartData, setLineChartData] = useState(null);
  const [dashboardError, setDashboardError] = useState(null);
  const [YourGrowth, setYourGroth] = useState(0);
  const [selectedBarChartDate, setSelectedBarChartDate] = useState(DateFormatYearMonth());
  const [searchingFor, setSearchingFor] = useState({
    BarChart: false,
    LineChart: false
  })
  const [sales, setSales] = useState({
    dailysales: 0,
    monthlysales: 0,
    alltimesales: 0
  })




  function GetuserIdAgencyId() {
    let { user, agentData, agentPic } = JSON.parse(localStorage.getItem('userAuthDetails') === null ? '{}' : localStorage.getItem('userAuthDetails'))
    if (!user || !agentData || !agentPic) {
      LogoutUser()
    }
    setUserData({ user, agentData, agentPic })
    return user
  }



  // function for fetching dashboard data
  const fetchDashboardData = async () => {
    await getDashboardData(GetuserIdAgencyId, setDashboardData, setDashboardError);
    await getAllmyAgentsAndTopAgentOfMonth(GetuserIdAgencyId, setDashboardData, setDashboardError);
    await getComplianceRating(GetuserIdAgencyId, setDashboardData, setDashboardError);
    await getMyPolicies(GetuserIdAgencyId, setDashboardData, setDashboardError);
    await getAgentCommissions(GetuserIdAgencyId, setDashboardData, setDashboardError);
  }



  // function for searching data 
  const SearchAgent = () => {
    let arr = dashboardData?.myAgents?.filter((item, index) => {
      if (item?.firstName?.toLowerCase()?.includes(search.toLocaleLowerCase()) || item?.lastName?.toLowerCase()?.includes(search.toLocaleLowerCase())) {
        return item
      }
    })
    setFoundAgents(arr)
  }



  // function for compare the data with searched user in bar chart
  const callCompareApi = async (otherUserId) => {
    await getComparisonData(GetuserIdAgencyId, otherUserId, setBarChartData, setDashboardError)
  }





  // function for compare the data with searched user in Line chart
  const callCompareApiLineChart = async (otherUserId) => {
    await getComparisonData(GetuserIdAgencyId, otherUserId, setLineChartData, setDashboardError)
  }





  // function for calculate compliancerating
  const get_compliance_Rating = useCallback(() => {
    return (DashboardGetComplianceRating(dashboardData))
  }, [dashboardData])





  // function for calculate policies comparision for bar chart 
  const gettotalPoliciesComparison = useCallback(() => {
    return (DashboardGetTotalPoliciesComparison(dashboardData, barChartData, selectedBarChartDate, userData))
  }, [barChartData, selectedBarChartDate])





  useEffect(() => {

    setSales({
      dailysales: dashboardData?.todaypolicy?.length ? dashboardData?.todaypolicy?.length : 0,
      monthlysales: dashboardData?.monthlypolicy?.length ? dashboardData?.monthlypolicy?.length : 0,
      alltimesales: dashboardData?.alltimepolicy?.length ? dashboardData?.alltimepolicy?.length : 0
    })
  }, [dashboardData])


  useEffect(() => {
    if (search != "") {
      SearchAgent()
    }
    if (search == "") {
      setSearchingFor({
        BarChart: false,
        LineChart: false
      })
      setCompareWith('')
      setFoundAgents([])
    }
  }, [search])

  useEffect(() => {
    fetchDashboardData()
    callCompareApi(GetuserIdAgencyId()?.id)
    callCompareApiLineChart(GetuserIdAgencyId()?.id)
  }, [])



  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };

  }, [window.innerWidth])








  return (
    <div className="flex flex-row sm:items-center items-center lg:items-start sm:mx-auto sm:justify-center flex-wrap">
      <main className=" sm:w-[80%] lg:w-[50%] w-full mx-auto">
        <div className="">
          <div className="px-4 py-4 sm:px-4 lg:px-5 lg:py-6 h-full w-full bg-slate-100  ">
            {/* Main area */}
            <div className="pt-3 pb-2 ">
              <div className="mx-auto max-w-7xl px-2">
                <div className="mx-auto max-w-2xl lg:mx-0">
                  <h2 className="text-3xl font-bold font-['SpaceGroteskBold'] tracking-tight text-alpha-primary sm:text-3xl">
                    Welcome, {userData?.agentData?.firstName}.
                  </h2>
                  <p className="mt-2 text-md leading-8 text-[#777777] font-['SpaceGroteskMedium'] font-normal">
                    Your dedication drives success. Let's make today
                    extraordinary!
                  </p>
                </div>
              </div>


              <div className="flex gap-x-2 mx-auto  pb-2 pt-5 px-2">
                <div className="py-2 px-2">
                  <DashboardIcon />
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-alpha-secondary sm:text-3xl font-['SpaceGroteskBold']">
                  Your Dashboard
                </h2>
              </div>
              <ProgressCards sales={sales} dashboardData={dashboardData} />
              <div className="mx-auto mt-4  py-4 px-6 max-w-2xl gap-x-4 rounded-2xl lg:gap-8 bg-white">
                <div className="flex justify-between ">
                  <div className="text-base leading-7">
                    <h3 className="font-bold text-alpha-primary font-['SpaceGroteskBold']">
                      Sales this Month
                    </h3>
                  </div>
                  <div className="text-base leading-7 ">
                    <div className="relative  flex  inline-block">
                      <input
                        onChange={(e) => {
                          if (isPastMonth(e.target.value)) {
                            setSelectedBarChartDate(e.target.value)
                          } else {
                            e.preventDefault()
                          }
                        }}
                        type="month"
                        className="block appearance-none w-32 bg-[#F1F1F1]  text-gray-700 text-xs py-0.5 px-3 rounded-full leading-tight focus:outline-none focus:ring focus:border-blue-500 font-[TTNormsProBold]"
                        value={selectedBarChartDate}


                      />
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 ml-4 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                        >
                          <path
                            d="M0.5 1.5L5 4.5L9.5 1.5"
                            stroke="#545454"
                            strokeWidth="1.6"
                          />
                        </svg>
                      </div>
                    </div>
                    {width > 1400 && <div className={`h-0 relative w-full mt-2 bg-red-400 flex items-start flex-col  `}>
                      <div className={`flex h-5 mb-2  items-center justify-center `}>
                        <div className='w-[15px] h-[15px] bg-[#1755F9]'></div>
                        <span className='text-xs ml-1 font-[500] '>{userData?.user?.firstName} {userData?.user?.lastName}</span>
                      </div>
                      {(compareWith !== "" && searchingFor?.BarChart == true) && <div className='flex  items-center justify-center pb-1'>
                        <div className='w-[15px] h-[15px] bg-[#F58427]'></div>
                        <span className='text-xs ml-1 font-[500]'>{compareWith}</span>
                      </div>}
                    </div>}
                  </div>
                </div>
                <div className={`py-1 ${width < 650 ? 'flex-wrap' : 'inline-flex'}`}>
                  <h3 className="font-bold text-blue-600 font-['TTNormsProBold'] text-xs pe-2 py-1">
                    COMPARE ME WITH:
                  </h3>
                  <div className="relative flex items-center">
                    <div className='relative'>
                      {
                        searchingFor?.BarChart == false && <svg
                          className="w-4 h-4 mt-1 absolute left-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 15l5.794 5.794m-5.794-5.794a6 6 0 1 0-8.485-8.485 6 6 0 0 0 8.485 8.485z"
                          />

                        </svg>
                      }
                      <input
                        value={searchingFor?.BarChart == true ? search : ''}
                        onChange={(e) => {
                          // setLineChartData(null)
                          setSearch(e.target.value)
                          setSearchingFor({
                            LineChart: false,
                            BarChart: true

                          })
                        }}
                        type="text"
                        className={`text-xs py-0.5 px-3 lg:w-48 rounded-full border bg-[#F1F1F1] border-gray-300 focus:outline-none focus:ring focus:border-blue-500`}
                      />

                      {foundAgents?.length !== 0 && searchingFor?.BarChart == true &&
                        <div div className='w-2 h-0'> <div className={`relative w-48 h-0  sm:ml-[22%] ${width < 600 ? 'ml-[35%]' : 'ml-[28%] '}  flex items-center`}>
                          <div className='absolute border-2 w-full rounded-e-md border-slate-200  top-0 max-h-[200px] bg-white overflow-y-auto'>
                            {foundAgents?.map((item, index) => {
                              return (
                                <p key={index} onClick={() => {

                                  setCompareWith(`${item?.firstName} ${item?.lastName}`)
                                  callCompareApi(item?.id)
                                  setSearch(`${item?.firstName} ${item?.lastName}`)
                                }} className='cursor-pointer px-2 text-sm hover:bg-gray-200 rounded-e-md'> {item?.firstName}  {item?.lastName}</p>
                              )
                            })}
                          </div>
                        </div>
                        </div>}
                    </div>
                  </div>
                </div>
                <div className='flex flex-row justify-between w-full'>
                  <h1 className="font-bold w-[50%] text-3xl text-blue-500 ">{gettotalPoliciesComparison()}</h1>
                  <div className=' flex-col justify-end  items-end'>


                    {width < 1400 && <div className={`h-0 relative w-full `}>
                      <div className={`flex h-5 mb-1   items-start justify-start `}>
                        <div className='w-[15px] h-[15px] bg-[#1755F9]'></div>
                        <span className='text-xs ml-1 font-[500] '>{userData?.user?.firstName} {userData?.user?.lastName}</span>
                      </div>
                      {(compareWith !== "" && searchingFor?.BarChart == true) && <div className='flex flex-row  items-start justify-start'>
                        <div className='w-[15px] h-[15px] bg-[#F58427]'></div>
                        <span className='text-xs ml-1 font-[500]'>{compareWith}</span>
                      </div>}
                    </div>}
                  </div>
                </div>

                <div className="py-3">
                  <div className="h-44">
                    <BarChart

                      searchingFor={searchingFor}
                      selectedBarChartDate={selectedBarChartDate}
                      userData={userData}
                      barChartData={barChartData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >

      <aside
        className={`lg:px-1 mx-auto  sm:w-[80%] lg:w-[50%]`}>
        <div className={`sm:px-4 lg:px-3 lg:py-6 h-full ${width < 1050 ? 'bg-slate-100' : 'bg-white'}`}>
          <div className={`flex gap-x-4 pt-1 ${width < 1150 ? 'flex-col  flex-wrap ' : 'flex-row '}`}>
            <div className={`mx-auto mt-4  py-2 px-6 max-w-2xl gap-x-4 rounded-2xl ${width < 1050 ? 'bg-white' : 'bg-slate-100'}  ${width < 1350 ? 'w-full' : 'w-full'}`}>
              <div className="text-base leading-7">
                <h3 className="font-bold text-lg text-alpha-primary pb-1 font-['SpaceGroteskBold']">
                  Compliance Rating
                </h3>
                <h1
                  className="mr-auto w-14 min-w-max whitespace-nowrap rounded-full bg-[#3AD049] px-1 py-1 text-center text-xl font-bold leading-5 text-white"
                  aria-hidden="true"
                >
                  {get_compliance_Rating()}
                  {/* {dashboardData?.complianceRating?.length} */}
                </h1>
                <div className="py-2 ">
                  <Rating
                    transition
                    size={52}
                    allowFraction
                    initialValue={get_compliance_Rating()}
                    readonly={true}
                    fillColor="#D2D44D"
                  />
                </div>

                <p className="font-bold text-xs text-gray-300 w-full text-left ">
                  Great job—keep up the good work!
                </p>
              </div>
            </div>
            <div className={`mx-auto mt-4 py-4 px-4 max-w-2xl gap-x-4 rounded-2xl ${width > 1050 ? 'bg-slate-100' : 'bg-white'} ${width < 1150 ? 'w-full' : 'w-[45%]'}`}>
              <div className="py-2">
                <img
                  className="object-cover inset-0 ring-alpha-primary ring-[7px] rounded-full m-auto w-20"
                  src={require('../../../assets/images/avatar.png')}
                  alt="Card Image"
                />
              </div>
              <div className="text-center font-['TTNormsProBold']">
                <h2 className="text-xs mt-1 font-bold text-gray-400 mx-auto  max-w-[100%]">
                  AGENT OF THE MONTH
                </h2>
                <p className="text-sm font-bold text-alpha-primary">
                  {dashboardData?.topagentOfMonth?.agent_name}
                </p>
              </div>
            </div>
          </div>
          <div className={`flex  gap-x-2 flex-wrap ${width < 1150 ? 'flex-col' : 'flex-row'}`}>
            <div className={`mx-auto   mt-4 py-2 px-4 max-w-2xl flex flex-col rounded-2xl ${width > 1050 ? 'bg-slate-100' : 'bg-white'} ${width < 1150 ? 'w-full' : 'w-[47%]'} `}>
              <div className="text-base leading-7">
                <h3 className="font-bold text-md mb-1 text-alpha-primary font-['SpaceGroteskBold']">
                  Monthly KYC
                </h3>
              </div>
              {/* donut comes here */}
              <div className='h-full flex items-center justify-center'>
                <DoughnutChart dashboardData={dashboardData} />
              </div>
            </div>
            <div className={`mx-auto mt-4  py-2  max-w-2xl gap-x-4 rounded-2xl ${width > 1050 ? 'bg-slate-100' : 'bg-white'}  ${width < 1150 ? 'w-full px-4' : 'w-[47%] px-2'}`}>
              <div className="text-base flex flex-col">
                <h3 className="font-bold text-md leading-7 mb-3 text-alpha-primary font-['SpaceGroteskBold']">
                  Goals
                </h3>


                {dashboardData?.goals?.length !== 0 && <Slideshow dashboardData={dashboardData} />}

              </div>
              {
                dashboardData?.goals?.length === 0 && <div className='w-full flex content-center items-center justify-center flex-row  text-alpha-primary h-[70%] text-center'>No goals for now!</div>
              }
            </div>
          </div>
          <div className={`mx-auto py-4 mt-4 px-4 max-w-2xl gap-x-4 rounded-2xl lg:gap-8 ${width > 1050 ? 'bg-slate-100' : 'bg-white'}`}>
            <div className="flex justify-between font-['SpaceGroteskBold']">
              <div className="text-base leading-7">
                <h3 className="font-bold text-md text-alpha-primary">
                  My Agents
                </h3>
              </div>
              <div className="text-base leading-7">
                <h3 className="font-bold text-xs text-gray-400">
                  {dashboardData?.myAgents?.length} TOTAL: 3 ELEPHANTS, 4 RHINOS, 10 BUFFALOS
                </h3>
              </div>
            </div>
            <div>
              <div className="py-3 flex overflow-x-auto px-1">
                {
                  dashboardData?.myAgents?.length !== 0 && dashboardData?.myAgents?.map((item, index) => {
                    return index < 7 && <div key={index} className={`mr-4 w-[20%]   flex items-center justify-center`}>

                      <Avatar calledFrom={'My-Agents'} img_src={item?.profile_photo} />

                    </div>
                  })
                }

                {
                  dashboardData?.myAgents?.length === 0 && <div className='w-full text-alpha-primary h-full text-center py-2'>No agents. Recruit More!</div>
                }



                {/* {
                  dashboardData?.myAgents?.map((item, index) => {
                    return <Avatar />
                  })
                } */}

              </div>
            </div>
          </div>
          <div className={`mx-auto mt-4 py-4 px-6 max-w-2xl gap-x-4 rounded-2xl lg:gap-8 ${width > 1050 ? 'bg-slate-100' : 'bg-white'}`}>
            <div className="flex justify-between font-['SpaceGroteskBold']">
              <div className="text-base leading-7">
                <h3 className="font-bold text-alpha-primary text-md">
                  Your Growth: {" "}
                  <span className={`font-bold text-md ${YourGrowth && YourGrowth?.charAt(0) === '-' ? 'text-red-500' : "text-green-500"}  w-full text-right`}>
                    {YourGrowth ? YourGrowth : 0}%

                  </span>
                </h3>
              </div>
              <div className="text-base leading-7 ">
                <div className="py-1 inline-flex items-center justify-center">
                  <h3 className="font-bold text-blue-600 font-['TTNormsProBold'] text-xs pe-2 py-0.5">
                    COMPARE:
                  </h3>
                  <div className="relative flex items-center">
                    <div className='relative'>
                      {
                        searchingFor?.LineChart == false && <svg
                          className="w-4 h-4 mt-2 absolute left-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 15l5.794 5.794m-5.794-5.794a6 6 0 1 0-8.485-8.485 6 6 0 0 0 8.485 8.485z"
                          />

                        </svg>
                      }
                      <input
                        // value={compareWith == "" ? searchingFor?.LineChart == true ? search : '' : compareWith != "" && searchingFor?.LineChart == false ? "" : compareWith}
                        value={searchingFor?.LineChart == true ? search : ''}
                        onChange={(e) => {
                          // setBarChartData(null)
                          setSearch(e.target.value)
                          setSearchingFor({
                            BarChart: false,
                            LineChart: true
                          })
                        }}
                        type="text"

                        className={`text-xs py-0.5 px-3 lg:w-48 rounded-full border bg-[#F1F1F1] border-gray-300 focus:outline-none focus:ring focus:border-blue-500`}
                      />
                      {foundAgents?.length !== 0 && searchingFor?.LineChart == true &&
                        <div div className='w-2 h-0'> <div className={`relative w-48 h-0  sm:ml-[22%] ${width < 600 ? 'ml-[35%]' : 'ml-[28%] '}  flex items-center`}>
                          <div className='absolute border-2 w-full rounded-e-md border-slate-200  top-0 max-h-[200px] bg-white overflow-y-auto'>
                            {foundAgents?.map((item, index) => {
                              return (
                                <p key={index} onClick={() => {

                                  setCompareWith(`${item?.firstName} ${item?.lastName}`)
                                  callCompareApiLineChart(item?.id)
                                  setSearch(`${item?.firstName} ${item?.lastName}`)
                                }} className='cursor-pointer px-2 text-sm hover:bg-gray-200 rounded-e-md'> {item?.firstName}  {item?.lastName}</p>
                              )
                            })}
                          </div>

                        </div>
                        </div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <LineChart
                setYourGroth={setYourGroth}
                searchingFor={searchingFor}
                compareWith={compareWith}
                userData={userData}
                barChartData={LineChartData}
              />
            </div>
          </div>
        </div>
      </aside>
    </div >
  );
};

export default Dashboard;
