import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PhaseTwoForm from './PhaseTwoForm';
import PoneMillionAccidentalDeathInsurance from './PoneMillionAccidentalDeathInsurance';
import PhaseOneForm from './PhaseOneForm';
import DoYouAgree from './DoYouAgree';
import { isEmail, isMobileNumber } from '../../utilities/helpers';




const AddPolicy = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const [phase, setPhase] = useState(1);
    const [phaseOneFormData, setPhaseOneFormData] = useState({
        insuranceProduct: '',
        typeOfIdentification: ''
    })
    const [phaseTwoFormData, setPhaseTwoFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
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
        policyStartTime: '',
        billingDate: '',
        paymentMethod: '',
    })
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const LoginUser = (data, navigate) => {
    //     localStorage.setItem('userAuthDetails', JSON.stringify(data));
    //     setisLoggedIn(true)
    //     navigate('/dashboard')
    // }

    // LogIn api called here
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

    useEffect(() => {
        if (error != '') {
            setTimeout(() => {
                setError('')
            }, 3000);
        }
    }, [error])




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


    return (
        <div style={{ height: width < 450 && phase === 1 ? window.innerHeight - 55 : width > 450 && phase === 1 ? window.innerHeight : '100%' }} className='flex items-center justify-center h-[100%]  bg-[#F4F6FD]'>

            {/* designing html for phase 1 of add policy */}
            {phase === 1 && <div className={`py-20  ${width < 450 ? 'px-10' : 'px-20 '} ${width < 550 ? 'w-[95%]' : ' w-[85%] '} bg-white shadow-md rounded-2xl text-start border-alpha-primary2 border mx-3`}>
                <h2 className="text-4xl font-bold mb-2 text-alpha-primary font-['SpaceGroteskBold']">
                    Activate Insurance
                </h2>
                <h4 className="text-lg mb-4 text-alpha-primary2">
                    Select the insurance product and add in customer details to activate their insurance.
                </h4>
                <PhaseOneForm phaseOneFormData={phaseOneFormData} error={error} setPhase={setPhase} setPhaseOneFormData={setPhaseOneFormData} />
            </div>}



            {/* designing html for phase 2 of add policy */}
            {/* {phase === 2 &&


                <div className={`py-20 mb-10 mt-[5%] ${window.innerWidth < 500 ? 'px-6 py-5' : 'px-20'} ${window.innerWidth < 550 ? 'w-[95%]' : ' w-[85%] '} bg-white shadow-md rounded-2xl text-start border-alpha-primary2 border mx-3`}>
                    <h2 className={`${window.innerWidth < 450 ? 'text-2xl mb-3' : 'text-4xl'} font-bold lg:mb-6 text-alpha-primary font-['SpaceGroteskBold']`}>
                        Legal Insurance: P49
                    </h2>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block  text-alpha-primary font-bold mb-1"
                        >
                            Customer Details
                        </label>

                    </div>
                    <PhaseTwoForm
                        handleOpen={handleOpen}
                        phaseTwoFormData={phaseTwoFormData}
                        error={error}
                        setPhaseTwoFormData={setPhaseTwoFormData}
                        handleSubmit={handleSubmit}
                    />

                </div>} */}
            {phase === 2 &&


                <div className={`py-20 mb-10 mt-[5%] ${width < 500 ? 'px-6 py-5' : 'px-20'} ${width < 550 ? 'w-[95%]' : ' w-[85%] '} bg-white shadow-md rounded-2xl text-start border-alpha-primary2 border mx-3`}>
                    <h2 className={`${width < 450 ? 'text-2xl mb-3' : 'text-4xl'} font-bold lg:mb-6 text-alpha-primary font-['SpaceGroteskBold'] text-center`}>
                        P1 Million Accidental Death Insurance

                    </h2>
                    <div className='w-full flex  rounded-lg border-2 mb-6 flex-wrap'>
                        <span className='w-[50%] font-semibold text-xl px-5 py-5'>Activation Code : 37288826 </span>
                        <span className='w-[50%] font-semibold text-xl  px-5 py-5'>Plan : P1 Million Accidental Death Insurance </span>
                        <span className='w-[50%] font-semibold text-xl px-5 py-5'>Premium : P 49.00 </span>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block  text-alpha-primary font-bold mb-1"
                        >
                            Customer Information :
                        </label>

                    </div>
                    {/* <PhaseTwoForm
                        handleOpen={handleOpen}
                        phaseTwoFormData={phaseTwoFormData}
                        error={error}
                        setPhaseTwoFormData={setPhaseTwoFormData}
                        handleSubmit={handleSubmit}
                    /> */}
                    <PoneMillionAccidentalDeathInsurance />
                </div>}
            <DoYouAgree
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                handleOpen={handleOpen}
            />



        </div>
    )
}

export default AddPolicy