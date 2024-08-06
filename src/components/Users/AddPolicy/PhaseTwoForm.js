import React from 'react'

const PhaseTwoForm = ({ phaseTwoFormData, error, handleSubmit, setPhaseTwoFormData }) => {
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


    return (
        <form >
            <div className={`flex ${isMobile ? 'flex-col' : ' flex-row'}`}>
                <div className={`mb-4 ${isMobile ? '' : 'w-[50%]'}  `}>
                    <label
                        htmlFor="email"
                        className="block  text-alpha-primary font-bold mb-1"
                    >
                        First Name<sup className='text-red-500'>*</sup>
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
                        Middle Name<sup className='text-red-500'>*</sup>
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
                        Last Name<sup className='text-red-500'>*</sup>
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
                        Gender<sup className='text-red-500'>*</sup>
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
                        Passport Number<sup className='text-red-500'>*</sup>
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
                <div className={`mb-4 ${isMobile ? '' : 'ml-5 w-[50%]'}`}>
                    <label
                        htmlFor="email"
                        className="block  text-alpha-primary font-bold mb-1"
                    >
                        Passport Issuing Country<sup className='text-red-500'>*</sup>
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
            </div>
            <div className={`flex ${isMobile ? 'flex-col' : ' flex-row'}`}>
                <div className={`mb-4 ${isMobile ? '' : 'w-[50%]'}  `}>
                    <label
                        htmlFor="email"
                        className="block  text-alpha-primary font-bold mb-1"
                    >
                        Date of Birth<sup className='text-red-500'>*</sup>
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
                <div className={`mb-4 ${isMobile ? '' : 'ml-5 w-[50%]'}`}>
                    <label
                        htmlFor="email"
                        className="block w-full text-alpha-primary font-bold mb-1"
                    >
                        Marital Status<sup className='text-red-500'>*</sup>
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
            <div className={`flex ${isMobile ? 'flex-col' : ' flex-row'}`}>
                <div className={`mb-4 ${isMobile ? '' : 'w-[50%]'}  `}>
                    <label
                        htmlFor="email"
                        className="block  text-alpha-primary font-bold mb-1"
                    >
                        Mobile Number<sup className='text-red-500'>*</sup>
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
                    {
                        error?.mobileError && <p className='text-[#E62323] font-[700] text-xs mt-1'>{error?.mobileError}</p>
                    }
                </div>
                <div className={`mb-4 ${isMobile ? '' : 'ml-5 w-[50%]'}`}>
                    <label
                        htmlFor="email"
                        className="block  text-alpha-primary font-bold mb-1"
                    >
                        Email<sup className='text-red-500'>*</sup>
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
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block  text-alpha-primary font-bold mb-1"
                >
                    Physical Address<sup className='text-red-500'>*</sup>
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
                    State<sup className='text-red-500'>*</sup>
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
                    City/Town<sup className='text-red-500'>*</sup>
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
                    Source of Income/Funds<sup className='text-red-500'>*</sup>
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
            <div className={`flex ${isMobile ? 'flex-col' : ' flex-row'}`}>
                <div className={`mb-4 ${isMobile ? '' : 'w-[50%]'}  `}>
                    <label
                        htmlFor="email"
                        className="block w-full text-alpha-primary font-bold mb-1"
                    >
                        Policy Start Time<sup className='text-red-500'>*</sup>
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
                        Billing Date<sup className='text-red-500'>*</sup>
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
                    Payment Method<sup className='text-red-500'>*</sup>
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
            <button
                onClick={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
                type="btn"
                className="bg-alpha-primary w-full font-bold py-2 px-4 rounded-lg text-gray-color1"
            >
                Receive OTP Verification
            </button>
        </form >
    )
}

export default PhaseTwoForm