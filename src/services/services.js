import axios from "axios";




// constants
const URL = `https://graphite.alphadirect.co.bw/api/`;
const LOCAL_URL = `http://localhost:5500/`
const HEADER = {
    'Content-Type': 'application/json'
}
const COMMON_CONFIG = {
    method: 'POST',
    maxBodyLength: Infinity,
    headers: HEADER
}



//================================================================================ called api for agent login


export const login = async (email, password, storeId, LoginUser, setError, navigate, setType, setShowLoader) => {
    let data = JSON.stringify({
        "storeId": 1,
        "email": email,
        "password": password
    });
    let config = {
        ...COMMON_CONFIG,
        url: URL + 'agentLogin',
        data: data
    };
    axios.request(config)
        .then((response) => {
            if (response?.status === 200) {
                // console.log('responseresponseresponse', response)
                if (response?.data) {

                    if (response?.data?.user?.roles[0]?.name === "Agent") {
                        // login as agent
                        let type = "agent";
                        setType(type)
                        LoginUser(response?.data, navigate, type)

                    } else {
                        // login as admin
                        let type = "admin";
                        setType(type)
                        LoginUser(response?.data, navigate, type)
                    }

                    setShowLoader(false)
                }
            }
        })
        .catch((error) => {
            setError(error?.response?.data?.Description);
            setShowLoader(false)
        });
}



//========================================================== called api for data of agents Dashboard



export const getDashboardData = async (GetuserIdAgencyId, setDashboardData, setDashboardError) => {
    let data = JSON.stringify({
        "userId": GetuserIdAgencyId()?.id,
        "agency_id": GetuserIdAgencyId()?.agency_id
    });
    let config = {
        ...COMMON_CONFIG,
        url: LOCAL_URL + 'agents-dashboard',
        data: data
    };
    axios.request(config)
        .then((response) => {
            // console.log((response));
            if (response?.data?.status == true) {

                setDashboardData((t) => (t !== null ? { ...t, ...response?.data?.data } : { ...response?.data?.data }))
                // localStorage.setItem('Dashboard_Data', JSON.stringify(response?.data?.data))
            } else {
                setDashboardError({
                    error: true,
                    for: 'Whole Dashboard',
                    message: 'Unable to Fetch Dashboard Data'
                })
            }
        })
        .catch((error) => {
            console.log(error);
        });
}


export const getAllmyAgentsAndTopAgentOfMonth = async (GetuserIdAgencyId, setDashboardData, setDashboardError) => {
    let data = JSON.stringify({
        "agencyId": GetuserIdAgencyId()?.agency_id
    });
    let config = {
        ...COMMON_CONFIG,
        url: LOCAL_URL + 'get-all-myagents',
        data: data
    };
    axios.request(config)
        .then((response) => {
            // console.log((response));
            if (response?.data?.status == true) {
                // console.log('getAllmyAgentsAndTopAgentOfMonth', response?.data?.data)
                setDashboardData((t) => (t !== null ? { ...t, ...response?.data?.data } : { ...response?.data?.data }))
                // localStorage.setItem('Dashboard_Data', JSON.stringify(response?.data?.data))
            } else {
                setDashboardError({
                    error: true,
                    for: 'Whole Dashboard',
                    message: 'Unable to Fetch Dashboard Data'
                })
            }
        })
        .catch((error) => {
            console.log(error);
        });
}


export const getComplianceRating = async (GetuserIdAgencyId, setDashboardData, setDashboardError) => {
    let data = JSON.stringify({
        "userId": GetuserIdAgencyId(true)?.id
    });
    let config = {
        ...COMMON_CONFIG,
        url: LOCAL_URL + 'get-compliance-rating',
        data: data
    };

    axios.request(config)
        .then((response) => {

            if (response?.data?.status == true) {

                setDashboardData((t) => (t !== null ? { ...t, ...response?.data?.data } : { ...response?.data?.data }))
                // localStorage.setItem('Dashboard_Data', JSON.stringify(response?.data?.data))
            } else {
                setDashboardError({
                    error: true,
                    for: 'Whole Dashboard',
                    message: 'Unable to Fetch Dashboard Data'
                })
            }
        })
        .catch((error) => {
            console.log(error);
        });
}


export const getMyPolicies = async (GetuserIdAgencyId, setDashboardData, setDashboardError) => {
    let data = JSON.stringify({
        "userId": GetuserIdAgencyId()?.id
    });
    let config = {
        ...COMMON_CONFIG,
        url: LOCAL_URL + 'get-my-policies',
        data: data
    };
    axios.request(config)
        .then((response) => {
            // console.log((response));
            if (response?.data?.status == true) {
                // console.log("getMyPolicies", response?.data?.data)
                setDashboardData((t) => (t !== null ? { ...t, ...response?.data?.data } : { ...response?.data?.data }))
                // localStorage.setItem('Dashboard_Data', JSON.stringify(response?.data?.data))
            } else {
                setDashboardError({
                    error: true,
                    for: 'Whole Dashboard',
                    message: 'Unable to Fetch Dashboard Data'
                })
            }
        })
        .catch((error) => {
            console.log(error);
        });
}


export const getAgentCommissions = async (GetuserIdAgencyId, setDashboardData, setDashboardError) => {

    let config = {
        ...COMMON_CONFIG,
        method: 'GET',
        url: LOCAL_URL + 'get-agent-commissions',

    };
    axios.request(config)
        .then((response) => {
            // console.log((response));
            if (response?.data?.status == true) {
                // console.log('getAgentCommissions', response?.data?.data);
                setDashboardData((t) => (t !== null ? { ...t, ...response?.data?.data } : { ...response?.data?.data }))
                // localStorage.setItem('Dashboard_Data', JSON.stringify(response?.data?.data))
            } else {
                setDashboardError({
                    error: true,
                    for: 'Whole Dashboard',
                    message: 'Unable to Fetch Dashboard Data'
                })
            }
        })
        .catch((error) => {
            console.log(error);
        });
}






//====================================  called api for get data of logged in user and the other user they want to compare




export const getComparisonData = async (GetuserIdAgencyId, otherUserId, setBarChartData, setDashboardError) => {
    // console.log(otherUserId)
    let data = JSON.stringify({
        "userId": GetuserIdAgencyId()?.id,
        "otherUserId": otherUserId,
        "agency_id": GetuserIdAgencyId()?.agency_id
    });
    let config = {
        ...COMMON_CONFIG,
        url: LOCAL_URL + 'search-agent',
        data: data
    };
    axios.request(config)
        .then((response) => {
            // console.log("response---------------------------------------------->", response.data);
            if (response?.data?.status) {
                setBarChartData(response?.data?.data)
            } else {
                setDashboardError({
                    error: true,
                    for: 'Bar Chart',
                    message: 'Unable to Fetch that user Data'
                })
            }
        })
        .catch((error) => {
            console.log(error);
        });
}



export const getProfileDataApi = (id, email, setUserData, userData) => {
    let data = JSON.stringify({
        "userId": id,
        "userEmail": email
    });



    let config = {
        ...COMMON_CONFIG,
        url: LOCAL_URL + 'profile',
        data: data
    };

    axios.request(config)
        .then((response) => {
            if (response?.data?.status === true) {
                let data = { ...userData, address: response.data?.data?.address };

                setUserData(data)

            }

        })
        .catch((error) => {
            console.log(error);
        });
}


export const getAllManagers = async (setManagersList) => {

    let config = {
        ...COMMON_CONFIG,
        method: 'get',
        url: LOCAL_URL + 'get-managers',
    };

    axios.request(config)
        .then((response) => {
            if (response.data?.status == true) {
                setManagersList(response.data?.data);
            } else {
                setManagersList([])
            }
        })
        .catch((error) => {
            console.log(error);
        });

}


export const getAllMyAgents = async (agencyId, setAgentsList, setshowLoader) => {
    setshowLoader(true)
    let data = JSON.stringify({
        "agencyId": agencyId
    });

    let config = {
        ...COMMON_CONFIG,
        url: LOCAL_URL + 'get-all-myagents',
        data: data
    };

    axios.request(config)
        .then((response) => {

            if (response?.data?.status == true) {
                setAgentsList(response?.data?.data?.myAgents)
            }
            setshowLoader(false)
        })
        .catch((error) => {
            console.log(error);
            setshowLoader(false)
        });

}

export const getAllMyComplaints = async (agentId) => {
    let data = JSON.stringify({
        "agentId": agentId
    });

    let config = {
        ...COMMON_CONFIG,
        url: LOCAL_URL + 'get-my-complaints',
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log((response.data));
        })
        .catch((error) => {
            console.log(error);
        });

}


