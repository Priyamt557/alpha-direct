import { HomeIcon, UsersIcon, CircleStackIcon, CheckCircleIcon, ListBulletIcon, InformationCircleIcon, BellAlertIcon, ArrowRightOnRectangleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import {
    HomeIcon as HomeIconSolid,
    UsersIcon as UsersIconSolid,
    CircleStackIcon as CircleStackIconSolid,
    CheckCircleIcon as CheckCircleIconSolid,
    ListBulletIcon as ListBulletIconSolid,
    InformationCircleIcon as InformationCircleIconSolid,
    BellAlertIcon as BellAlertIconSolid
} from "@heroicons/react/24/solid";
import { goals } from "./constants";
var n = new Date().getMonth()
var y = new Date().getFullYear()


export function isMobileNumber(input) {
    const cleanInput = input.replace(/[^\d]/g, '');
    return cleanInput.length === 10;
}

export function isEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}


export const checkAuth = () => {
    if (localStorage["userAuthDetails"]) {
        let { user, agentData, agentPic, type } = JSON.parse(localStorage.getItem('userAuthDetails') === null ? '{}' : localStorage.getItem('userAuthDetails'));
        if (!user || !agentData || !agentPic || !type) {

            localStorage.removeItem("userAuthDetails");
            return false

        }
        if (type !== 'admin' && type !== 'agent') {
            localStorage.removeItem("userAuthDetails");
            return false
        }
        return true
    } else {
        return false
    }
}


export function FormatDateForProfilePage(date) {
    const inputDate = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);

    return formattedDate
}

export function getPercentage(dashboardData) {

    if (dashboardData === null) {
        return {
            kyccomp: 0, nonokyccomp: 0, pendingcomp: 0
        }
    }
    let kyc = dashboardData?.KycComplaincesOfActivePolicies?.length;
    let nonKyc = dashboardData?.NonKycComplaincesOfActivePolicies?.length;
    let pending = dashboardData?.PendingKycComplaincesOfActivePolicies?.length;

    const total = kyc + nonKyc + pending;
    let kyccomp = ((kyc * 100) / total).toFixed(2);
    if (isNaN(kyccomp)) {
        return {
            kyccomp: 0, nonokyccomp: 0, pendingcomp: 0
        }
    }
    let nonokyccomp = ((nonKyc * 100) / total).toFixed(2);
    let pendingcomp = ((pending * 100) / total).toFixed(2);
    return ({
        kyccomp, nonokyccomp, pendingcomp
    })
}

export const AgentNavigations = (getUrlPath) => {

    return ([
        {
            name: 'Home', href: '/dashboard',
            icon: getUrlPath() === '/dashboard' ? HomeIconSolid : HomeIcon, current: getUrlPath() === '/dashboard' ? true : false
        },
        {
            name: 'My Profile',
            href: '/profile',
            icon: getUrlPath() === '/profile' ? UsersIconSolid : UsersIcon,
            current: getUrlPath() === '/profile' ? true : false
        },
        {
            name: 'My Bonuses',
            href: '/my-bonuses ',
            icon: getUrlPath() === '/my-bonuses' ? CircleStackIconSolid : CircleStackIcon,
            current: getUrlPath() === '/my-bonuses' ? true : false
        },
        {
            name: 'Compliance',
            href: '/compliances ',
            icon: getUrlPath() === '/compliances' ? CheckCircleIconSolid : CheckCircleIcon,
            current: getUrlPath() === '/compliances' ? true : false
        },
        {
            name: 'Agent Directory',
            href: '/agent-directory',
            icon: getUrlPath() === '/agent-directory' ? ListBulletIconSolid : ListBulletIcon,
            current: getUrlPath() === '/agent-directory' ? true : false
        },
        {
            name: 'Additional Info',
            href: '/additional-info/promotions',
            icon: getUrlPath().includes("/additional-info") ? InformationCircleIconSolid : InformationCircleIcon,
            current: getUrlPath().includes("/additional-info") ? true : false,
            children: [
                {
                    name: 'Promotions',
                    href: '/additional-info/promotions',
                    current: getUrlPath() === '/additional-info/promotions' ? true : false
                },
                {
                    name: 'Rules and Norms',
                    href: '/additional-info/rules-and-norms',
                    current: getUrlPath() === '/additional-info/rules-and-norms' ? true : false
                },
                {
                    name: 'Insurance Policies',
                    href: '/additional-info/insurance-policies',
                    current: getUrlPath() === '/additional-info/insurance-policies' ? true : false
                }
            ]
        },
        {
            name: 'Notifications',
            href: '/notifications ',
            icon: getUrlPath() === '/notifications' ? BellAlertIconSolid : BellAlertIcon,
            current: getUrlPath() === '/notifications' ? true : false,
            count: '1'
        },
        {
            name: 'Logout',
            href: '/login',
            icon: ArrowRightOnRectangleIcon,
            current: false
        }
    ]
    )
}

export function isPastMonth(date) {
    const selectedDate = new Date(date)
    const currentDate = new Date();
    return selectedDate < currentDate;
}


export const AdminNavigations = (getUrlPath) => {
    return ([
        { name: 'Home', href: '/dashboard', icon: HomeIcon, current: getUrlPath() === '/dashboard' ? true : false },
        { name: 'My Profile', href: '/profile', icon: UsersIcon, current: getUrlPath() === '/profile' ? true : false },
        {
            name: 'Bonuses',
            href: '/bonuses ',
            icon: CircleStackIcon,
            current: getUrlPath() === '/bonuses' ? true : false
        },
        {
            name: 'Agents Compliances',
            href: '/agents-compliances',
            icon: CheckCircleIcon,
            current: getUrlPath() === '/agents-compliances' ? true : false
        },
        {
            name: 'Agent List',
            href: '/agents-list',
            icon: ListBulletIcon,
            current: getUrlPath() === '/agents-list' ? true : false
        },
        {
            name: 'Additional Info',
            href: '/additional-info/promotions',
            icon: InformationCircleIcon,
            current: getUrlPath().includes("/additional-info") ? true : false,
            children: [
                {
                    name: 'Promotions',
                    href: '/additional-info/promotions',
                    current: getUrlPath() === '/additional-info/promotions' ? true : false
                },
                {
                    name: 'Rules and Norms',
                    href: '/additional-info/rules-and-norms',
                    current: getUrlPath() === '/additional-info/rules-and-norms' ? true : false
                },
                {
                    name: 'Insurance Policies',
                    href: '/additional-info/insurance-policies',
                    current: getUrlPath() === '/additional-info/insurance-policies' ? true : false
                }
            ]
        },
        {
            name: 'Notifications',
            href: '/notifications ',
            icon: BellAlertIcon,
            current: getUrlPath() === '/notifications' ? true : false,
            count: '1'
        },
        {
            name: 'Settings',
            href: '/settings ',
            icon: Cog6ToothIcon,
            current: getUrlPath() === '/settings' ? true : false
            // count: '1'
        },
        {
            name: 'Logout',
            href: '/login',
            icon: ArrowRightOnRectangleIcon,
            current: false
        }
    ])
}


export function getRange(type, sales) {
    if (type === 'Daily Progress') {
        if (sales < 5) {
            return [0, 5]
        } else if (sales >= 5 && sales < 10) {
            return [5, 10]
        } else if (sales >= 10 && sales < 15) {
            return [10, 15]
        } else if (sales >= 15 && sales < 20) {
            return [15, 20]
        } else {
            return [0, 20]
        }
    } else if (type === "Monthly") {
        if (sales < 100) {
            return [0, 100]
        } else if (sales >= 100 && sales < 120) {
            return [100, 120]
        } else if (sales >= 120 && sales < 150) {
            return [120, 150]
        } else if (sales >= 150 && sales < 180) {
            return [150, 180]
        } else {
            return [0, 180]
        }
    } else if (type === "All Time") {
        if (sales?.alltimesales < 50) {
            return [0, 50]
        } else if (sales >= 50 && sales < 100) {
            return [50, 100]
        } else if (sales >= 100 && sales < 500) {
            return [100, 500]
        } else if (sales >= 500 && sales < 1000) {
            return [500, 1000]
        } else if (sales >= 1000 && sales <= 2000) {
            return [1000, 2000]
        } else {
            return [0, 2000]
        }
    }
}



export function getBonus(activeCard, sales, dashboardData) {

    let result = null
    for (let i in goals) {
        let item = goals[i];
        if (activeCard?.title === 'Daily Progress') {

            if (sales?.dailysales < 5 && item?.id == 'd1') {
                result = { ...item, bonus: 'P0', range: [0, 5] }
                break;
            } else if (sales?.dailysales >= 5 && sales?.dailysales < 10 && item?.id == 'd2') {

                result = { ...item, bonus: 'P20', range: [5, 10] }
                break;
            } else if (sales?.dailysales >= 10 && sales?.dailysales < 15 && item?.id == 'd3') {

                result = { ...item, bonus: 'P50', range: [10, 15] }
                break;
            } else if (sales?.dailysales >= 15 && sales?.dailysales < 20 && item?.id == 'd4') {

                result = { ...item, bonus: 'P70', range: [15, 20] }
                break;
            } else if (sales?.dailysales === 20 && item?.id == 'd5') {

                result = { ...item, bonus: 'P100', range: [0, 20] }
                break;
            }
        } else if (activeCard?.title === "Monthly") {
            if (sales?.monthlysales < 100 && item?.id == 'm1') {

                result = { ...item, bonus: 'P0', range: [0, 100] }
                break;
            } else if (sales?.monthlysales >= 100 && sales?.monthlysales < 120 && item?.id == 'm2') {

                result = { ...item, bonus: 'P250', range: [100, 120] }
                break;
            } else if (sales?.monthlysales >= 120 && sales?.monthlysales < 150 && item?.id == 'm3') {

                result = { ...item, bonus: 'P300', range: [120, 150] }
                break;
            } else if (sales?.monthlysales >= 150 && sales?.monthlysales < 180 && item?.id == 'm4') {

                result = { ...item, bonus: 'P350', range: [150, 180] }
                break;
            } else if (sales?.monthlysales > 180 && item?.id == 'm5') {

                result = { ...item, bonus: 'P500', range: [0, 180] }
                break;
            }
        } else if (activeCard?.title === "All Time") {

            if (sales?.alltimesales < 50 && item?.id == 'a1') {

                result = { ...item, bonus: 'P0', range: [0, 50] }
                break;
            } else if (sales?.alltimesales >= 50 && sales?.alltimesales < 100 && item?.id == 'a1') {

                result = { ...item, bonus: 'P50', range: [50, 100] }
                break;
            } else if (sales?.alltimesales >= 100 && sales?.alltimesales < 500 && item?.id == 'a2') {

                result = { ...item, bonus: 'P100', range: [100, 500] }
                break;
            } else if (sales?.alltimesales >= 500 && sales?.alltimesales < 1000 && item?.id == 'a3') {

                result = { ...item, bonus: 'P500', range: [500, 1000] }
                break;
            } else if (sales?.alltimesales >= 1000 && sales?.alltimesales <= 2000 && item?.id == 'a4') {

                result = { ...item, bonus: 'P1000', range: [1000, 2000] }
                break;
            } else if (sales?.alltimesales > 2000 && item?.id == 'a5') {

                result = { ...item, bonus: 'P2000', range: [0, 2000] }
                break;
            }
        }
    }
    return result
}

export function setLineData(userData, selectedBarChartDate, barChartData, compareWith, setYourGroth) {

    let Linelabels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];



    let dataSet1 = function getDataset1() {
        let dataOfDataset1 = [];
        for (let i = 0; i <= n; i++) {
            let temp = '0' + (i + 1).toString();
            let val = 0;
            barChartData?.data?.map((item, index) => {
                if (item?.agent_id == userData?.user?.id) {
                    if (item?.policy_date?.substring(5, 7) === temp) {
                        val += item?.row_count
                    }
                }
            });
            dataOfDataset1.push(val)
        }
        return dataOfDataset1.filter(item => item !== undefined && item !== null)
    }




    let dataSet2 = function getDataset2() {
        let dataOfDataset2 = [];
        for (let i = 0; i <= n; i++) {
            let temp = '0' + (i + 1).toString();
            let val = 0;
            barChartData?.data?.map((item, index) => {
                if (item?.agent_id != userData?.user?.id) {
                    if (item?.policy_date?.substring(5, 7) === temp) {
                        val += item?.row_count
                    }
                }
            });
            dataOfDataset2.push(val)
        }
        return dataOfDataset2.filter(item => item !== undefined && item !== null)
    }


    let dataObject = {
        labels: Linelabels.filter((item, index) => {
            if (index <= n) {
                return item
            }
        }),
        datasets: [
            {
                label: userData?.user?.firstName + " " + userData?.user?.lastName,
                data: barChartData === null ? [] : dataSet1(),
                borderColor: '#33325D',
                borderWidth: 1.5,
                pointRadius: 2,
                pointBackgroundColor: '#33325D',
                fill: 'start',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, 'rgba(250,174,50,1)');
                    gradient.addColorStop(1, 'rgba(27, 6, 120, 0)');
                    return gradient;
                },
                yAxisID: 'y'
            },
            {
                label: compareWith,
                data: barChartData === null ? [] : dataSet2(),
                borderColor: '#F58020',
                borderWidth: 1.5,
                pointRadius: 2,
                pointBackgroundColor: '#F58020',
                fill: 'start',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, 'rgba(250,174,50,1)');
                    gradient.addColorStop(1, 'rgba(250,174,50,0)');
                    return gradient;
                },
                yAxisID: 'y'
            }
        ]
    };


    calculateMyGrowth(dataSet1(), dataSet2(), setYourGroth, compareWith)
    if (compareWith === "") {

        dataObject = { ...dataObject, datasets: [dataObject['datasets'][0]] }
        return dataObject
    }

    return dataObject
}


export const DateFormatYearMonth = () => {
    return `${y.toString()}-${(n + 1).toString().length === 1 ? '0' + (n + 1).toString() : (n + 1).toString()}`
}




// export function BarChartGetLabels(barChartData, selectedBarChartDate) {
//     return barChartData === null ? [] : (barChartData?.data?.map((item, index) => {
//         if (item?.policy_date?.substring(0, 7) === selectedBarChartDate) {
//             return item?.policy_date?.substring(5, 7);
//         }
//     })).filter(item => item !== undefined && item !== null).reduce((acc, value) => {
//         if (!acc.includes(value)) {
//             acc.push(value);
//         }
//         return acc;
//     }, [])
// }


export function BarChartGetLabels(barChartData, selectedBarChartDate) {

    return barChartData === null ? [] : (barChartData?.data?.map((item, index) => {
        if (item?.policy_date?.substring(0, 7) === selectedBarChartDate) {

            return item?.policy_date?.substring(8, 10);
        }
    })).filter(item => item !== undefined && item !== null && item !== 0)
}

export function BarChartGetDataset1(barChartData, selectedBarChartDate, userData, labels) {

    let resultingArray = [];
    if (barChartData === null) {
        return [];
    } else {

        barChartData?.data?.map((item, index) => {
            if (item?.policy_date?.substring(0, 7) === selectedBarChartDate) {
                if (item?.agent_id == userData?.user?.id) {
                    resultingArray.push({ date: item?.policy_date?.substring(8, 10), policies: item?.row_count })
                }
            }
        })
    }


    resultingArray = labels.map((item, index) => {
        let res = 0;
        resultingArray.map((data, i) => {
            if (data?.date == item) {
                res = data?.policies
            }
        })
        return res
    })

    return resultingArray
}


export function calculateMyGrowth(Dataset1, Dataset2, setYourGroth) {
    let totalOfDataset1 = 0;
    let totalOfDataset2 = 0;
    Dataset1.map((item, index) => {
        totalOfDataset1 += item
    })
    Dataset2.map((item, index) => {
        totalOfDataset2 += item
    })

    let whole = totalOfDataset1 / Dataset1.length
    let part = Dataset1[Dataset1.length - 1];
    let myPercentage = 0;

    let wholeOfDataSet2 = totalOfDataset2 / Dataset2.length;
    let partOfDataSet2 = Dataset2[Dataset2.length - 1];
    let yourPercentage = 0;

    if (wholeOfDataSet2 === 0 && partOfDataSet2 === 0) {
        if (part < whole) {
            myPercentage = ((whole - part) / whole) * 100;
            if (isNaN(myPercentage)) {
                setYourGroth(0);
            } else {
                setYourGroth("-" + parseInt(myPercentage).toFixed(2))
            }
        } else {
            myPercentage = ((part - whole) / whole) * 100;
            if (isNaN(myPercentage)) {
                setYourGroth(0);
            } else {
                setYourGroth("+" + parseInt(myPercentage).toFixed(2));
            }
        }
    } else {
        if (part < whole) {
            myPercentage = ((whole - part) / whole) * 100;
            myPercentage = -myPercentage.toFixed(2);

        } else {
            myPercentage = ((part - whole) / whole) * 100;
            myPercentage = +myPercentage.toFixed(2);
        }
        if (partOfDataSet2 < whole) {
            yourPercentage = ((wholeOfDataSet2 - partOfDataSet2) / wholeOfDataSet2) * 100;
            yourPercentage = -yourPercentage.toFixed(2);
        } else {
            yourPercentage = ((partOfDataSet2 - wholeOfDataSet2) / wholeOfDataSet2) * 100;
            yourPercentage = +yourPercentage.toFixed(2);
        }
        let res = myPercentage - yourPercentage;
        if (isNaN(res)) {
            setYourGroth(0);
        } else {
            setYourGroth(res.toFixed(2))
        }
    }
}

export function BarChartGetDataset2(barChartData, selectedBarChartDate, userData, labels) {


    let resultingArray = [];
    if (barChartData === null) {
        return [];
    } else {

        barChartData?.data?.map((item, index) => {
            if (item?.policy_date?.substring(0, 7) === selectedBarChartDate) {
                if (item?.agent_id != userData?.user?.id) {
                    resultingArray.push({ date: item?.policy_date?.substring(8, 10), policies: item?.row_count })
                }
            }
        })
    }

    resultingArray = labels.map((item, index) => {
        let res = 0;
        resultingArray.map((data, i) => {
            if (data?.date == item) {
                res = data?.policies
            }
        })
        return res
    })

    return resultingArray



}



// function for calculate compliancerating

export function DashboardGetComplianceRating(dashboardData) {
    if (dashboardData === null) return '0'
    let totalNumberofPolicies = dashboardData?.complianceRating?.length;
    let totalNumberOfCompliance = 0;
    dashboardData?.complianceRating?.map((item, index) => {
        if (item?.compliance != 0) {
            totalNumberOfCompliance += 1;
        }
    })
    if (isNaN(Math.round((totalNumberOfCompliance / totalNumberofPolicies * 10) * 10) / 10)) {
        return '0'
    }
    return Math.round((totalNumberOfCompliance / totalNumberofPolicies * 10) * 10) / 10;
}



// function for calculate policies comparision for bar chart 
export function DashboardGetTotalPoliciesComparison(dashboardData, barChartData, selectedBarChartDate, userData) {

    if (dashboardData === null && barChartData === null) return '0'
    let mytotalNumberofPolicies = 0;
    let otherUserTotalNumberOfPolicies = 0;



    barChartData?.data?.map((item, index) => {
        if (item?.policy_date?.substring(0, 7) === selectedBarChartDate) {
            if (item?.agent_id == userData?.user?.id) {
                mytotalNumberofPolicies += item?.row_count;
            } else {
                otherUserTotalNumberOfPolicies += item?.row_count;
            }
        }
    }
    );
    return (`${mytotalNumberofPolicies} - ${otherUserTotalNumberOfPolicies}`)
}