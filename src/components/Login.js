import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../services/services';
import Loader from './utilities/Loader';


const Login = ({ setType, setisLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const LoginUser = (data, navigate, type) => {
    localStorage.setItem('userAuthDetails', JSON.stringify({ ...data, type: type }));
    setisLoggedIn(true)
    navigate('/dashboard')
  }


  // LogIn api called here
  const handleSubmit = async () => {
    setShowLoader(true)
    await login(email, password, 1, LoginUser, setError, navigate, setType, setShowLoader)
  }

  useEffect(() => {
    if (error != '') {
      setTimeout(() => {
        setError('')
      }, 3000);
    }
  }, [error])


  return (
    <div className="flex h-full">
      {/* Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <div className="flex flex-col items-center lg:mb-7 py-3">
          <h1 className="font-bold text-alpha-primary text-2xl lg:text-6xl sm:text-3xl  font-['TTNormsProBold']">
            Motiv<span className="text-alpha-secondary">Agent</span>
          </h1>
          <div className="flex items-end w-full justify-end -mr-14">
            <img
              src={require('../assets/images/alphadirect_logo2.png')}
              alt="Logo"
            />
          </div>
        </div>
        <div className="py-16 px-10 max-w-sm w-full bg-white shadow-md rounded-2xl text-start border-alpha-primary2 border mx-3">
          <h2 className="text-4xl font-bold mb-2 text-alpha-primary font-['SpaceGroteskBold']">
            Dumelang!
          </h2>
          <h4 className="text-lg mb-4 text-alpha-primary2">
            Welcome back. Please enter your details.
          </h4>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block  text-alpha-primary font-bold mb-1"
              >
                Email
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
                autoComplete='email'
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="password"
                className="block text-alpha-primary font-bold mb-1"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                autoComplete="current-password"
                type="password"
                id="password"
                className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                placeholder="Enter your password"
              />
            </div>
            <p className='text-center mb-6 text-[red]'>{error}</p>
            <button
              disabled={showLoader}
              onClick={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
              type="btn"
              className="bg-alpha-primary w-full font-bold py-2 px-4 rounded-lg text-gray-color1"
            >
              {
                showLoader ?
                  <Loader /> :
                  'Sign In'
              }

            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 hidden lg:block">
        <div className="h-100 overflow-hidden ">
          <img
            src={require('../assets/images/pattern.jpg')}
            alt="Login Background"
            className="object-fill" style={{
              height: '100vh',
              width: '100%'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
