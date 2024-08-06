import React, { useState, useCallback, useEffect } from 'react'
import { Rating } from 'react-simple-star-rating';
import { DashboardGetComplianceRating } from '../../utilities/helpers'
import { getAllMyComplaints, getComplianceRating } from '../../../services/services';


const Compliances = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [userData, setUserData] = useState(GetuserIdAgencyId());
    function GetuserIdAgencyId(onlyUser) {
        let { user, agentData, agentPic } = JSON.parse(localStorage.getItem('userAuthDetails') === null ? '{}' : localStorage.getItem('userAuthDetails'))
        if (!user || !agentData || !agentPic) {
            LogoutUser()
        }
        // setUserData({ user, agentData, agentPic })
        if (onlyUser) {
            return user
        } else {
            return ({ user, agentData, agentPic })
        }
    }

    useEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, [window.innerWidth])
    const [complianceData, setComplianceData] = useState(null)
    const [error, setError] = useState(null)



    // function for calculate compliancerating
    const getcomplianceRating = useCallback(() => {
        return (DashboardGetComplianceRating(complianceData))
    }, [complianceData])


    const getComplianceDataa = async () => {
        await getComplianceRating(GetuserIdAgencyId, setComplianceData, setError)
    }

    useEffect(() => {
        getComplianceDataa()
    }, [])


    useEffect(() => {
        if (userData !== null) {

            getAllMyComplaints(userData?.agentData?.id)

        } else {

            GetuserIdAgencyId()
        }
    }, [userData])





    return (
        <div className='bg-slate-100'>
            < div className={`mx-auto py-2 px-3 sm:px-6  gap-x-4 rounded-2xl bg-slate-100  ${width < 1350 ? 'w-full' : 'w-full'}`
            }>
                <div className="text-base leading-7">
                    <h3 className="font-bold mt-8 text-lg sm:text-[32px] text-alpha-primary pb-1 font-['TTNormsProBold']">
                        Compliance
                    </h3>

                    <div className="py-1 flex flex-row">
                        <Rating
                            transition
                            size={52}
                            allowFraction
                            initialValue={getcomplianceRating()}
                            readonly={true}
                            fillColor="#D2D44D"
                        />
                        <div
                            className="flex px-5 items-center justify-center min-w-max ml-5 sm:ml-10 whitespace-nowrap rounded-full bg-[#3AD049] text-center text-xl font-bold leading-5 text-white"
                            aria-hidden="true"
                        >
                            {getcomplianceRating()}
                        </div>
                    </div>





                    {<div className={`py-16  ${width < 450 ? 'px-4' : 'px-14'} ${width < 550 ? 'w-[95%]' : ' w-[90%] '} bg-white mt-[20px] shadow-md rounded-2xl text-start border-alpha-primary2 border mx-3`}>
                        <h2 className="text-[30px] font-bold mb-2 text-alpha-primary font-['TTNormsProBold']">
                            All Complaints
                        </h2>
                        <div className={` py-5 ${width < 450 ? '' : ''} flex-wrap justify-start  w-full flex flex-row h-full`}>
                            {Array.from({ length: 5 }, (_, index) => index + 1).map((item, index) => {
                                return (
                                    <div className={` ${width < 450 ? '' : 'mr-[30px] w-[196px]'}  mt-[30px] min-h-[173px] px-6 py-6 ml-1 cursor-pointer hover:bg-gray-100 shrink-0 rounded-3xl bg-white shadow-compliance-card-shadow`}>
                                        <p className={`text-alpha-primary leading-3 text-[15px] font-[700] font-[' TTNormsProBold']`}>June 18th, 2023</p>
                                        <p className={`text-alpha-primary mt-6 leading-3 text-[12px] font-[700] font-['TTNormsProBold']`}>Level 1</p>
                                        <p className={`text-alpha-primary leading-3 text-[12px] font-[700] font-['TTNormsProBold']`}>Reason: <span className={`text-alpha-primary leading-3 text-[12px] font-[400] font-['TTNormsProBold']`}>Customer not interested in Policy </span></p>
                                        <p className={` ${item % 2 == 0 ? 'text-[#32C140]' : 'text-[#DBCA30]'} leading-3 text-[17px] mt-6 font-[700] font-['TTNormsProBold']`}>{item % 2 == 0 ? 'DISMISSED' : 'PENDING'}</p>
                                    </div>
                                )
                            })}
                        </div>

                    </div>}






                </div>
            </ div>
        </div >
    )
}

export default Compliances