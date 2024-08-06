import React, { useState, useEffect } from 'react'
import { isEmail, isMobileNumber } from '../../utilities/helpers';

const PoneMillionAccidentalDeathInsurance = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 550)

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleWindowResize = () => {
            setIsMobile(window.innerWidth < 550)
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, [window.innerWidth])
    const [error, setError] = useState('');
    const [phaseTwoFormData, setPhaseTwoFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        omang: '',
        passportNumber: '',
        passportIssuingCountry: '',
        dateOfBirth: '',
        maritialStatus: '',
        mobileNumber: '',
        email: '',
        physicalAddress: '',
        state: '',
        city_town: '',
        sourceOfIncome_funds: '',
        isAssistedByBroker: '',
        policyStartTime: '',
        billingDate: '',
        paymentMethod: '',
    })
    const handleSubmit = async () => {
        if (!isMobileNumber(phaseTwoFormData?.mobileNumber) || !isEmail(phaseTwoFormData?.email)) {
            setError({
                emailError: 'email required',
                mobileError: 'mobile number required',
            })
            // alert('enter vaild email and phone')
            return false
        }
        handleOpen()
        // await login(email, password, 1, LoginUser, setError, navigate)
    }
    return (
        <form >
            <div className={`flex ${isMobile ? 'flex-col' : ' flex-row'}`}>
                <div className={`mb-4 ${isMobile ? '' : 'w-[50%]'}  `}>
                    <label
                        htmlFor="email"
                        className="block  text-alpha-primary font-bold mb-1"
                    >
                        FIRST NAME<sup className='text-red-500'>*</sup>
                    </label>
                    <input
                        value={phaseTwoFormData?.firstName}
                        onChange={(e) => {
                            setPhaseTwoFormData({ ...phaseTwoFormData, firstName: e.target.value })
                        }}
                        type="email"

                        className={`w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700`}
                        placeholder="Enter customer’s first name"
                    />
                </div>
                <div className={`mb-4 ${isMobile ? '' : 'ml-5 w-[50%]'}  `}>
                    <label
                        htmlFor="email"
                        className="block  text-alpha-primary font-bold mb-1"
                    >
                        MIDDLE NAME<sup className='text-red-500'>*</sup>
                    </label>
                    <input
                        value={phaseTwoFormData?.middleName}
                        onChange={(e) => {
                            setPhaseTwoFormData({ ...phaseTwoFormData, middleName: e.target.value })
                        }}
                        type="email"

                        className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                        placeholder="Enter customer’s middle name"
                    />
                </div>
            </div>
            <div className={`flex ${isMobile ? 'flex-col' : ' flex-row'}`}>
                <div className={`mb-4 ${isMobile ? '' : 'w-[50%]'}  `}>
                    <label
                        htmlFor="email"
                        className="block  text-alpha-primary font-bold mb-1"
                    >
                        LAST NAME<sup className='text-red-500'>*</sup>
                    </label>
                    <input
                        value={phaseTwoFormData?.lastName}
                        onChange={(e) => {
                            setPhaseTwoFormData({ ...phaseTwoFormData, lastName: e.target.value })
                        }}
                        type="email"

                        className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                        placeholder="Enter customer’s first name"
                    />
                </div>
                <div className={`mb-4 ${isMobile ? '' : 'ml-5 w-[50%]'}`}>
                    <label
                        htmlFor="email"
                        className="block w-full text-alpha-primary font-bold mb-1"
                    >
                        GENDER<sup className='text-red-500'>*</sup>
                    </label>
                    <select
                        value={phaseTwoFormData?.gender}
                        onChange={(e) => {
                            setPhaseTwoFormData({ ...phaseTwoFormData, gender: e.target.value })
                        }}
                        type="select"

                        className="border-2 w-full border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                        placeholder="Select Gender"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div className={`flex ${isMobile ? 'flex-col' : ' flex-row'}`}>
                <div className={`mb-4 ${isMobile ? '' : 'w-[50%]'}  `}>
                    <label
                        htmlFor="email"
                        className="block  text-alpha-primary font-bold mb-1"
                    >
                        OMANG<sup className='text-red-500'>*</sup>
                    </label>
                    <input
                        value={phaseTwoFormData?.omang}
                        onChange={(e) => {
                            setPhaseTwoFormData({
                                ...phaseTwoFormData, omang: e.target.value
                            })
                        }}
                        type="email"

                        className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                        placeholder="Select passport issuing country"
                    />
                </div>
                <div className={`mb-4  ${isMobile ? '' : 'w-[50%] ml-5'}  `}>
                    <label
                        htmlFor="email"
                        className="block  text-alpha-primary font-bold mb-1"
                    >
                        PASSPORT<sup className='text-red-500'>*</sup>
                    </label>
                    <input
                        value={phaseTwoFormData?.passportNumber}
                        onChange={(e) => {
                            setPhaseTwoFormData({ ...phaseTwoFormData, passportNumber: e.target.value })
                        }}
                        type="email"

                        className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                        placeholder="Select passport issuing country"
                    />
                </div>

            </div>
            <div className={`flex ${isMobile ? 'flex-col' : ' flex-row'}`}>

                <div className={`mb-4 ${isMobile ? '' : ' w-[50%]'}`}>
                    <label
                        htmlFor="email"
                        className="block  text-alpha-primary font-bold mb-1"
                    >
                        PASSPORT ISSUING COUNTRY<sup className='text-red-500'>*</sup>
                    </label>
                    <input
                        value={phaseTwoFormData?.passportIssuingCountry}
                        onChange={(e) => {
                            setPhaseTwoFormData({ ...phaseTwoFormData, passportIssuingCountry: e.target.value })
                        }}
                        type="email"

                        className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                        placeholder="Enter customer’s passport number"
                    />
                </div>
                <div className={`mb-4 ${isMobile ? '' : 'ml-5 w-[50%]'}`}>
                    <label
                        htmlFor="email"
                        className="block w-full text-alpha-primary font-bold mb-1"
                    >
                        MARITIAL STATUS<sup className='text-red-500'>*</sup>
                    </label>
                    <select
                        value={phaseTwoFormData?.maritialStatus}
                        onChange={(e) => {
                            setPhaseTwoFormData({ ...phaseTwoFormData, maritialStatus: e.target.value })
                        }}
                        type="select"

                        className="border-2 w-full border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                        placeholder="Select Gender"
                    >
                        <option value="Married">Married</option>
                        <option value="Unmarried">Unmarried</option>

                    </select>
                </div>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block  text-alpha-primary font-bold mb-1"
                >DATE OF BIRTH
                    <sup className='text-red-500'>* Only individuals between the ages of 18-65 are eligible for this policy.</sup>
                </label>
                <input
                    value={phaseTwoFormData?.dateOfBirth}
                    onChange={(e) => {
                        setPhaseTwoFormData({ ...phaseTwoFormData, dateOfBirth: e.target.value })
                    }}
                    type="date"

                    className="border-2 w-full border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                    placeholder="Select Gender"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block  text-alpha-primary font-bold mb-1"
                >
                    MOBILE NUMBER<sup className='text-red-500'>*</sup>
                </label>
                <input
                    value={phaseTwoFormData?.mobileNumber}
                    onChange={(e) => {
                        setPhaseTwoFormData({ ...phaseTwoFormData, mobileNumber: e.target.value })
                    }}
                    type="email"

                    className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                    placeholder="Enter customer’s mobile number "
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block  text-alpha-primary font-bold mb-1"
                >
                    EMAIL<sup className='text-red-500'>*</sup>
                </label>
                <input
                    value={phaseTwoFormData?.email}
                    onChange={(e) => {
                        setPhaseTwoFormData({ ...phaseTwoFormData, email: e.target.value })
                    }}
                    type="email"

                    className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                    placeholder="Enter customer’s email"
                />
                {
                    error?.emailError && <p className='text-[#E62323] font-[700] text-xs mt-1'>{error?.emailError}</p>
                }
                {
                    error === "" &&
                    <p className='text-[#E62323] font-[700] text-xs mt-1'>Alert! Please do not enter a fake email ID for the customer.</p>
                }
            </div>

            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block  text-alpha-primary font-bold mb-1"
                >
                    PHYSICAL ADDRESS<sup className='text-red-500'>*</sup>
                </label>
                <input
                    value={phaseTwoFormData?.physicalAddress}
                    onChange={(e) => {
                        setPhaseTwoFormData({ ...phaseTwoFormData, physicalAddress: e.target.value })
                    }}


                    className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                    placeholder="Enter customer’s permanent address"
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block  text-alpha-primary font-bold mb-1"
                >
                    STATE<sup className='text-red-500'>*</sup>
                </label>
                <input
                    value={phaseTwoFormData?.state}
                    onChange={(e) => {
                        setPhaseTwoFormData({ ...phaseTwoFormData, state: e.target.value })
                    }}
                    type="email"

                    className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                    placeholder="Select State"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block  text-alpha-primary font-bold mb-1"
                >
                    CITY/TOWN<sup className='text-red-500'>*</sup>
                </label>
                <input
                    value={phaseTwoFormData?.city_town}
                    onChange={(e) => {
                        setPhaseTwoFormData({ ...phaseTwoFormData, city_town: e.target.value })
                    }}
                    type="email"

                    className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                    placeholder="Select city or town"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block  text-alpha-primary font-bold mb-1"
                >
                    SOURCE OF INCOME/FUNDS<sup className='text-red-500'>*</sup>
                </label>
                <input
                    value={phaseTwoFormData?.sourceOfIncome_funds}
                    onChange={(e) => {
                        setPhaseTwoFormData({ ...phaseTwoFormData, sourceOfIncome_funds: e.target.value })
                    }}
                    type="email"

                    className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                    placeholder="Select source of income or funds"
                />
            </div>
            <div className="mb-4">

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                    type="btn"
                    className="bg-alpha-primary mx-auto font-bold py-2 px-4 rounded-lg text-gray-color1"
                >
                    ADD BENEFICIARY DETAILS
                </button>
            </div>
            <div className={`mb-4`}>
                <label
                    htmlFor="email"
                    className="block w-full text-alpha-primary font-bold mb-1"
                >
                    ARE YOU BEING ASSISTED BY A BROKER?<sup className='text-red-500'>*</sup>
                </label>
                <select
                    value={phaseTwoFormData?.isAssistedByBroker}
                    onChange={(e) => {
                        setPhaseTwoFormData({ ...phaseTwoFormData, isAssistedByBroker: e.target.value })
                    }}
                    type="select"

                    className="border-2 w-full border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                    placeholder="Select Gender"
                >
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>

                </select>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block  text-alpha-primary font-bold mb-1"
                >
                    Payment :
                </label>

            </div>
            <div className={`flex ${isMobile ? 'flex-col' : ' flex-row'}`}>
                <div className={`mb-4 ${isMobile ? '' : 'w-[50%]'}  `}>
                    <label
                        htmlFor="email"
                        className="block w-full text-alpha-primary font-bold mb-1"
                    >
                        FROM WHEN YOU WOULD LIKE TO START YOUR POLICY ?<sup className='text-red-500'>*</sup>
                    </label>
                    <input
                        value={phaseTwoFormData?.policyStartTime}
                        onChange={(e) => {
                            setPhaseTwoFormData({ ...phaseTwoFormData, policyStartTime: e.target.value })
                        }}
                        type="date"

                        className="border-2 w-full border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                        placeholder="Select when customer would like to start their policy"
                    />
                </div>
                <div className={`mb-4 ${isMobile ? '' : 'ml-5 w-[50%]'}`}>
                    <label
                        htmlFor="email"
                        className="block  text-alpha-primary font-bold mb-1"
                    >
                        BILLING DATE<sup className='text-red-500'>*</sup>
                    </label>
                    <input
                        value={phaseTwoFormData?.billingDate}
                        onChange={(e) => {
                            setPhaseTwoFormData({ ...phaseTwoFormData, billingDate: e.target.value })
                        }}
                        type="date"

                        className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                        placeholder="Select billing date"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block  text-alpha-primary font-bold mb-1"
                >
                    PLEASE SELECT PAYMENT METHOD<sup className='text-red-500'>*</sup>
                </label>
                <input
                    value={phaseTwoFormData?.paymentMethod}
                    onChange={(e) => {
                        setPhaseTwoFormData({ ...phaseTwoFormData, paymentMethod: e.target.value })
                    }}
                    type="email"

                    className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                    placeholder="Select payment method"
                />
            </div>
            {error !== "" && <p className='text-center mb-6 text-[red]'>{error?.emailError + " and " + error?.mobileError}</p>}
            <div className='flex flex-col items-center justify-center'>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                    type="btn"
                    className="bg-alpha-primary mx-auto font-bold py-2 px-4 rounded-lg text-gray-color1"
                >
                    GET OTP
                </button>
                <span className='text-alpha-primary font-semibold mt-2'>If you face any issue regarding process policy, please contact us</span>
            </div>
        </form >
    )
}

export default PoneMillionAccidentalDeathInsurance