import React, { useState } from 'react'
import { useEffect } from 'react'
import { getAllMyAgents } from '../../../services/services'
import Loader from '../../utilities/Loader';
import AgentsSearchBar from './AgentsSearchBar';

const AgentDirectory = () => {
    const [userData, setUserData] = useState(GetuserIdAgencyId());
    const [showLoader, setshowLoader] = useState(false)
    const [agentsList, setAgentsList] = useState([]);
    const [search, setSearch] = useState('');
    function GetuserIdAgencyId() {
        let { user, agentData, agentPic } = JSON.parse(localStorage.getItem('userAuthDetails') === null ? '{}' : localStorage.getItem('userAuthDetails'))
        if (!user || !agentData || !agentPic) {
            LogoutUser()
        }
        return { user, agentData, agentPic }
    }

    useEffect(() => {
        getAllMyAgents(userData?.user?.agency_id, setAgentsList, setshowLoader);
    }, [])


    return (
        <div className='py-10 w-full bg-[#F4F6FD] '>


            <div className='w-[90%] mx-auto'>
                <p><span className='text-[#212060] font-[TTNormsProBold] text-[32px] font-[700] '>MotivAgent</span> <span className='text-[#F58020] font-[TTNormsProBold] text-[32px] font-[700] '>Directory</span></p>
                <div className='bg-white rounded-2xl mt-4 py-4 shadow-lg border-2 border-[#A9A9A9]'>
                    <AgentsSearchBar
                        search={search}
                        setSearch={setSearch}
                    />
                    <div className='w-full py-4 break-words  flex flex-row flex-wrap items-center justify-center'>
                        {
                            showLoader && <Loader />
                        }
                        {
                            showLoader === false && agentsList.length === 0 ?
                                <div className=''>
                                    <p className='mb-3 font-[TTNormsProRegular]'>
                                        we are unable to fetch agents
                                    </p>
                                    <span onClick={() => {
                                        getAllMyAgents(userData?.user?.agency_id, setAgentsList, setshowLoader);
                                    }} className='bg-[#212060] cursor-pointer font-[TTNormsProBold] text-white px-3 py-2 mt-2 rounded-xl'>Try Again</span>
                                </div> : null
                        }
                        {agentsList?.map((item, index) => {
                            let name = item?.firstName + ' ' + item?.lastName;

                            if (search == "") {
                                return (
                                    <p className='w-[30%] text-[#212060] font-[TTNormsProBold] text-[12px] sm:text-[16px] font-[700]  break-words cursor-pointer flex items-center  hover:bg-gray-100 text-center min-h-[100px] sm:text-start sm:px-10 px-2 border-2 border-[#c0b4b4] rounded-xl py-5 mb-2 bg-gray-50 mr-2' key={item.id}>
                                        {name}
                                    </p>
                                )
                            } else if (name?.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                                return (
                                    <p className='w-[30%] text-[#212060] font-[TTNormsProBold] text-[12px] sm:text-[16px] font-[700]  break-words cursor-pointer flex items-center  hover:bg-gray-100 text-center min-h-[100px] sm:text-start sm:px-10 px-2 border-2 border-[#c0b4b4] rounded-xl py-5 mb-2 bg-gray-50 mr-2' key={item.id}>
                                        {name}
                                    </p>
                                )
                            } else {

                            }

                        })}</div>
                </div>
            </div>
        </div>
    )
}

export default AgentDirectory