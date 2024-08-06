import React, { useState, useEffect, useCallback } from "react";
import BarChart from "./Dashboard/BarChart";
import { DateFormatYearMonth, gettotalPoliciesComparison, DashboardGetTotalPoliciesComparison, FormatDateForProfilePage, isPastMonth } from "../utilities/helpers";
import { getDashboardData, getComparisonData, getProfileDataApi } from "../../services/services";


const Profile = () => {


  const user = {
    name: "Monde Mungandi",
    username: "@salesgoddes",
    profileImagePath: require('../../assets/images/avatar.png'),
    backgroundImagePathLion: require('../../assets/images/ProfileBackgroundLion.png'),
    backgroundImagePathElephant: require('../../assets/images/ProfileBackground.png'),
    backgroundImagePathRhino: require('../../assets/images/ProfileBackgroundRhino.png'),
    backgroundImagePathBuffalo: require('../../assets/images/ProfileBackgroundBuffalo.png'),
    backgroundImagePathLeopard: require('../../assets/images/ProfileBackgroundLeopard.png'),
    hometown: "Kasane, Botswana",
    joinDate: "January 9th, 2022",
    agentCode: "1837",
    badges: [
      { id: 1, icon: "M12 2L6 22h12l-6-20z", name: "NAVIGATOR" },
      { id: 2, icon: "M12 2L6 22h12l-6-20z", name: "SPROUT" },
      { id: 3, icon: "M12 2L6 22h12l-6-20z", name: "NAVIGATOR" },
      { id: 4, icon: "M12 2L6 22h12l-6-20z", name: "SPROUT" },
      { id: 5, icon: "M12 2L6 22h12l-6-20z", name: "NAVIGATOR" },
      { id: 6, icon: "M12 2L6 22h12l-6-20z", name: "NAVIGATOR" },
      { id: 7, icon: "M12 2L6 22h12l-6-20z", name: "NAVIGATOR" },
      { id: 8, icon: "M12 2L6 22h12l-6-20z", name: "NAVIGATOR" },
    ],
  };

  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    console.log(userData?.user?.email)
  }, [dashboardData])
  const [search, setSearch] = useState('');
  const [foundAgents, setFoundAgents] = useState([]);
  const [compareWith, setCompareWith] = useState('');
  const [barChartData, setBarChartData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [LineChartData, setLineChartData] = useState(null);
  const [dashboardError, setDashboardError] = useState(null)
  const [selectedBarChartDate, setSelectedBarChartDate] = useState(DateFormatYearMonth());
  const [compare, setCompare] = useState(false);
  const [address, setAddress] = useState('')
  const [searchingFor, setSearchingFor] = useState({
    BarChart: false,
    LineChart: false
  })




  const [width, setWidth] = useState(window.innerWidth);


  function GetuserIdAgencyId() {
    let { user, agentData, agentPic } = JSON.parse(localStorage.getItem('userAuthDetails') === null ? '{}' : localStorage.getItem('userAuthDetails'))
    if (!user || !agentData || !agentPic) {
      LogoutUser()
    }
    setUserData({ user, agentData, agentPic })
    return user
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


  // function for fetching dashboard data
  const fetchDashboardData = async () => {
    await getDashboardData(GetuserIdAgencyId, setDashboardData, setDashboardError)
  }



  // function for compare the data with searched user in bar chart
  const callCompareApi = async (otherUserId) => {
    await getComparisonData(GetuserIdAgencyId, otherUserId, setBarChartData, setDashboardError)
  }





  // function for calculate policies comparision for bar chart 
  const gettotalPoliciesComparison = useCallback(() => {
    return (DashboardGetTotalPoliciesComparison(dashboardData, barChartData, selectedBarChartDate, userData))
  }, [barChartData, selectedBarChartDate])



  const getProfileData = () => {
    const { email, id } = userData?.user
    getProfileDataApi(id, email, setUserData, userData)
  }


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
    callCompareApi(GetuserIdAgencyId()?.id);

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


  useEffect(() => {
    if (userData !== null && (userData?.address == undefined || userData?.address == null)) {
      getProfileData()
    }

  }, [userData])


  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
    setPreviewImage(URL.createObjectURL(image));
  };
  return (
    <div className="w-full bg-[#EDF0F7]">
      <div className="w-full h-[200px] sm:h-[200px] lg:h-[220px] relative">
        <img className="w-full h-full" src={user?.backgroundImagePathElephant} alt="background" />
        <div className="relative bg-red-400 bottom-[-35px] sm:bottom-[-50px] md:bottom-[-65px]">
          {
            width > 640 &&
            <div
              className="absolute bg-white cursor-pointer h-20 w-20 lg:w-40 lg:h-40 md:h-36 md:w-36 sm:w-32 sm:h-32 sm:bottom-[-30%] bottom-[-20%] md:bottom-[-35%] overflow-hidden left-[8%] rounded-full border-4 border-[#7C4F2C]">
              <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} className={`absolute bg-red-300 w-full  h-full cursor-pointer opacity-0`} />
              <img
                src={previewImage ? previewImage : userData?.agentPic?.profile_photo === null || userData?.agentPic?.profile_photo === undefined ? user?.profileImagePath : userData?.agentPic?.profile_photo.includes("https://") ? userData?.agentPic?.profile_photo : "https://d20dgglp0tqnyi.cloudfront.net/" + userData?.agentPic?.profile_photo}
                alt="" />
            </div>

          }

        </div>




        <div className="bg-[#F4F6FD]">
          {/* if width >640 */}
          {
            width > 640 ?
              <div className={`text-[#212060]  ${width < 490 ? 'ml-[140px]' : width < 570 ? 'ml-[180px]' : width < 860 ? 'ml-[30%]' : width < 1024 ? "ml-[25%]" : width < 1040 ? 'sm:ml-[29%]' : width < 1180 ? "ml-[27%]" : width < 1290 ? 'ml-[24%]' : 'lg:ml-[22%]'}    `}>
                <p className="font-bold font-['TTNormsProBold'] sm:text-[30px] md:text-[40px]">{userData?.agentData?.firstName} {userData?.agentData?.lastName}</p>
                <p>{userData?.user?.email.split('@')[0]}</p>
              </div>
              :
              // if width < 640
              <div className={`text-[#212060]  pt-[60px] relative  w-full flex flex-col items-center justify-center`}>
                <div
                  className="absolute  h-[140px] w-[140px] bottom-[50px]  overflow-hidden  rounded-full border-4 border-[#7C4F2C]">
                  <input type="file" accept="image/*" onChange={handleImageChange} className={`absolute bg-red-300 w-full  h-full cursor-pointer opacity-0`} />
                  <img
                    src={previewImage ? previewImage : userData?.agentPic?.profile_photo === null || userData?.agentPic?.profile_photo === undefined ? user?.profileImagePath : userData?.agentPic?.profile_photo.includes("https://") ? userData?.agentPic?.profile_photo : "https://d20dgglp0tqnyi.cloudfront.net/" + userData?.agentPic?.profile_photo}
                    alt="" />
                </div>
                <p className="font-bold font-['TTNormsProBold'] sm:text-[30px] md:text-[40px]">{userData?.agentData?.firstName} {userData?.agentData?.lastName}</p>
                <p>{userData?.user?.email.split('@')[0]}</p>
              </div>
          }





          <div className={` ${width < 1300 ? "xl:px-28" : "xl:px-[100px]"} lg:px-20 ${width < 690 && 'flex items-center justify-center flex-col'}  ${width < 775 ? "sm:px-10" : width < 840 ? 'md:px-16' : 'md:px-28'}  mt-12 flex md:flex-row  flex-wrap`}>


            {/* buffalo card */}
            <div className={` ${width < 700 ? 'w-[85%]' : 'w-[186px] min-w-[186px] h-[299px] '}  px-4 py-4 flex-col rounded-xl bg-white flex items-center justify-center text-center`}>
              <img className="w-[122px] h-[158px]" src={require('../../assets/images/buffalo.png')} alt="" />
              <span className="text-[11px] text-center font-['TTNormsProBold'] mt-5 text-[#212060]">You’re a newcomer! Stampede towards success with grit and determination. Remember, even the mightiest herds start with a single buffalo.</span>
            </div>

            {/* user data card */}
            <div className={` px-4  ${width < 700 ? 'w-[85%] ml-0 mt-4' : 'w-[396px] min-w-[396px] ml-6'} py-4 flex-col h-[299px] rounded-xl bg-white flex`}>
              <span className="text-[20px] font-bold font-['SpaceGroteskBold']   text-[#212060]">Bio</span>
              <span className="text-[13px]    font-['TTNormsProRegular']  text-[#212060]">You’re a newcomer! Stampede towards success with grit and determination. Remember, even the mightiest herds start with a single buffalo.</span>
              <span className="text-[16px] mt-3 font-bold font-['SpaceGroteskBold']   text-[#8E8E8E]">Hometown</span>
              <span className="text-[13px]    font-['TTNormsProRegular']  text-[#212060]">{userData?.address ? userData?.address : 'Gaborone'}</span>
              <span className="text-[16px] mt-3 font-bold font-['SpaceGroteskBold']   text-[#8E8E8E]">Join Date</span>
              <span className="text-[13px]    font-['TTNormsProRegular']  text-[#212060]">{FormatDateForProfilePage(userData?.user?.created_at)}</span>
              <span className="text-[16px] mt-3 font-bold font-['SpaceGroteskBold']   text-[#8E8E8E]">Agent Code</span>
              <span className="text-[13px]    font-['TTNormsProRegular']  text-[#212060]">{userData?.user?.id}</span>
            </div>


            {/* empty card */}
            <div className={` ${width < 700 ? "w-[85%] h-[299px] mt-4" : "w-[298px] min-w-[298px] h-[299px]"} px-4 md:mt-4  sm:mt-4  ${width < 1300 ? 'xl:mt-4 xl:ml-0' : 'xl:mt-0 xl:ml-6'}  py-4 flex-col  rounded-xl bg-white flex  `}>
            </div>

            {/* badges */}
            <div className={` ${width < 700 ? "w-[85%]" : "w-[396px] h-[296px]"} xl:mb-10 ${width < 1300 ? 'sm:ml-6' : 'xl:ml-0'} px-4 md:mt-4 xl:mt-4   ${width < 1025 && width > 950 ? 'ml-6' : width < 1130 ? 'md:ml-0' : 'md:ml-6'}   py-4 flex-col mt-4  rounded-xl bg-white flex  `}>
              <span className="text-[20px] font-bold font-['SpaceGroteskBold']   text-[#212060]">Badges</span>
              <div className="w-full mt-6 items-center justify-around  flex flex-row flex-wrap">
                {user?.badges.map((item, index) => {
                  return (
                    <div className="items-center flex justify-center flex-col">
                      <div className="w-[75px] h-[75px] bg-[#D9D9D9] custom-clip-path "></div>
                      <span className="font-['TTNormsProBold'] text-[#212060] mt-2 text-[12px] font-[400] text-center">{item?.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* bar chart code */}
            <div className={` ${width < 700 ? 'w-[85%] mt-6' : 'w-[510px] h-[296px]'} mb-10 px-4  md:mt-4 xl:mt-4 lg:mt-4 xl:ml-6 ${width < 1025 && width > 950 ? 'ml-6' : width < 1130 ? 'md:ml-0' : 'md:ml-6'}   py-4  rounded-xl bg-white`}>
              <div className="flex-row flex justify-between items-center">
                <span className={`${width < 700 ? 'text-[12px] ' : 'text-[20px] '} font-bold font-['SpaceGroteskBold']   text-[#212060]`}>Monthly Sales</span>
                <div className="flex flex-row items-center justify-center">
                  <span className={` ${width < 700 ? 'text-[8px] ' : 'text-[15px] '} font-bold font-['TTNormsProBold']   text-[#4A6DEC]`}> Compare</span>

                  <input type="checkbox" value={compare} onChange={(e) =>
                    setCompare(!compare)} className="w-2 h-2 text-blue-600  bg-gray-100 border-gray-300 rounded-lg cursor-pointer  mx-2  " />

                  <div className="text-base leading-7">
                    <div className="relative inline-block">
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
                        defaultValue={selectedBarChartDate}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none">
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

              </div>
              {
                compare && <div className={`py-1 ${width < 650 ? 'flex-wrap' : 'inline-flex'}`}>
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
                          setLineChartData(null)
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
                        <div div className='w-2 h-0'> <div className={`relative w-48 h-0  sm:ml-[22%] ${width < 700 ? 'ml-[35%]' : 'ml-[28%] '}  flex items-center`}>
                          <div className='absolute border-2 w-full rounded-e-md border-slate-200  top-0 max-h-[200px] bg-white overflow-y-auto'>
                            {foundAgents?.map((item, index) => {
                              return (
                                <p onClick={() => {

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
              }

              <div className='flex flex-row justify-between w-full'>
                <h1 className="w-[50%] text-[#1755F9] font-[TTNormsProBold] text-[30px] my-2 font-[700] ">{gettotalPoliciesComparison()}</h1>
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

              <div className="h-[150px]">
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
      {/* Add your profile content here */}
    </div >
  );
};

export default Profile;
