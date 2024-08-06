import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllManagers } from '../../services/services';

const OnBoarding = ({ setVisit }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    // const LoginUser = (data, navigate) => {
    //     localStorage.setItem('userAuthDetails', JSON.stringify(data));
    //     setisLoggedIn(true)
    //     navigate('/dashboard')
    // }

    // LogIn api called here
    const handleSubmit = async () => {
        setVisit(true)
        navigate('/login')
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

    })

    const [managersList, setManagersList] = useState([])
    useEffect(() => {
        getAllManagers(setManagersList)
    }, [])


    return (
        <div className={`flex flex-col h-full items-center justify-center ${width < 400 ? "mt-6" : "mt-16"}`}>
            <div className="flex flex-col items-center lg:mb-7 py-3">
                <h1 className="font-bold text-alpha-primary text-2xl lg:text-6xl sm:text-3xl  font-['TTNormsProBold']">
                    Motiv<span className="text-alpha-secondary">Agent</span>
                </h1>
                <div className="flex items-end w-full justify-end -mr-14">
                    <img
                        src={require('../../assets/images/alphadirect_logo2.png')}
                        alt="Logo"
                    />
                </div>
            </div>
            <div className={`py-12 px-10 ${width < 550 ? 'w-[95%]' : ' w-[60%] '} bg-white shadow-md rounded-2xl text-start border-alpha-primary2 border mx-3`}>
                <h2 className="text-4xl font-bold mb-2 text-alpha-primary font-['SpaceGroteskBold']">

                    Welcome to MotivAgent!
                </h2>
                <h4 className="text-lg mb-4 text-alpha-primary2">
                    Put in your info for onboarding!
                </h4>
                <form >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block  text-alpha-primary font-bold mb-1"
                        >
                            Bio
                        </label>
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            type="email"
                            id="email"
                            className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className='flex flex-row'>
                        <div className="mb-4 w-[50%]">
                            <label
                                htmlFor="password"
                                className="block text-alpha-primary font-bold mb-1"
                            >
                                Hometown
                            </label>
                            <input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                // type="password"
                                id="password"
                                className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                                placeholder="City"
                            />
                        </div>
                        <div className="mb-4 ml-5 w-[50%]">
                            <label
                                htmlFor="password"
                                className="block opacity-0 text-alpha-primary font-bold mb-1"
                            >
                                Password
                            </label>
                            <input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                // type="password"
                                id="password"
                                className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                                placeholder="Country"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block  text-alpha-primary font-bold mb-1"
                        >
                            Select the agent you are working under:
                        </label>
                        <select
                            disabled={managersList.length == 0}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            type="select"
                            id="email"
                            className="w-full cursor-pointer border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                            placeholder="Enter your email"
                        >
                            {managersList?.map((item, index) => {
                                return (
                                    <option className='cursor-pointer text-gray-500' key={item?.id} value={`${item?.id}`}>{item?.firstName} {item?.lastName}</option>
                                )
                            })}

                        </select>
                    </div>
                    <p className='text-center mb-6 text-[red]'>{error}</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                        type="btn"
                        className="bg-alpha-primary w-full font-bold py-2 px-4 rounded-lg text-gray-color1"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div >
    )
}

export default OnBoarding