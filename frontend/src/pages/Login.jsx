import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Login = () => {
    const { setState, setLoggedIn, login, setNav, loading, authUser, hasLoggedOut } = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && authUser !== null) {
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/');
            }
        }
    }, [loading, navigate]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        const res = await login({ 
            email,
            password
        })
        if(res.success && res.user !== null) {
            setLoggedIn(true);
            hasLoggedOut.current = false;
            setNav(true);
            navigate('/');
        }
        setIsDisabled(false);
    }

    return (
        <div className='min-h-screen w-full flex bg-black'>
            {/* Website Info */}
            <div className='hidden lg:flex flex-col justify-center px-22 xl:px-44 pt-10 w-1/2'>
                <div className='flex items-center gap-4 pb-34'>
                    <img src="/favicon.png" alt="icon" className='max-w-14 h-fit' />
                    <img src="/logo.png" alt="logo" className='max-w-54 h-fit' />
                </div>
                <h1 className='text-2xl pb-10 tracking-wider font-semibold text-[#c5c7b6]'>Connect. Chat. Converse.</h1>
                <p className="font-light leading-relaxed text-white max-w-xs">
                    Experience seamless, real-time chats with a design that keeps things simple and human.
                </p>
                <div className='flex gap-5 py-7'>
                    <img src="/facebook.svg" alt="facebook icon" className='cursor-pointer hover:scale-[1.03] transition-all duration-300' />
                    <img src="/twitter.svg" alt="twitter icon" className='cursor-pointer hover:scale-[1.03] transition-all duration-300' />
                    <img src="/instagram.svg" alt="instagram icon" className='cursor-pointer hover:scale-[1.03] transition-all duration-300' />
                </div>
            </div>

            {/* Login */}
            <div className='w-full lg:w-1/2 flex flex-col justify-end items-center sm:px-6 pt-6'>
                <div className='h-1/6 hidden max-lg:flex justify-center items-center sm:gap-3 gap-2'>
                    <img src="/favicon.png" alt="icon" className='w-10 sm:w-14 h-fit' />
                    <img src="/logo.png" alt="logo" className='w-40 sm:w-54 h-fit' />
                </div>
                <div className='max-sm:w-full h-5/6 w-full sm:max-w-2/3 bg-[#a9a89b] text-black rounded-t-3xl lg:self-start flex flex-col items-center xl:px-10 sm:px-5 py-20'>
                    <p className='text-lg font-light'>Welcome Back!</p>
                    <h1 className='text-2xl font-bold text-center'>Log In to ZappChat</h1>
                    <form onSubmit={handleSubmit} className='py-5 flex flex-col w-[60%] justify-center items-center'>
                        <div className='w-full mt-1'>
                            <label className="text-xs text-black">Email</label>
                            <input 
                                type="email" 
                                onChange={(e) => {setEmail(e.target.value)}}
                                value={email}
                                required
                                placeholder='you@example.com' 
                                className='w-full outline-none text-sm py-2 px-4 mt-1 border rounded-lg border-gray-700' 
                            />
                        </div>
                        <div className='w-full mt-3'>
                            <label className=" text-black text-xs">Password</label>
                            <input 
                                type="password" 
                                onChange={(e) => {setPassword(e.target.value)}}
                                value={password}
                                required
                                placeholder='••••••••' 
                                className='w-full outline-none text-sm py-2 px-4 border mt-1 rounded-lg border-gray-700' 
                            />
                        </div>
                        <div className='flex flex-wrap justify-between mt-3 w-full'>
                            <label className='text-xs flex items-center gap-1 cursor-pointer w-fit'>
                                <input type="checkbox" className='accent-black' />
                                Remember Me
                            </label>
                            <p onClick={() => {navigate('/forgot-password')}} className='text-xs text-right text-blue-900 cursor-pointer hover:underline hover:underline-offset-4 w-fit'>
                                Forgot Password?
                            </p>
                        </div>
                        <button 
                            type='submit' 
                            disabled={isDisabled}
                            className={`w-full tex-center py-3 text-white xl:text-sm text-xs rounded-lg flex sm:gap-3 gap-1 justify-center items-center mt-8 ${isDisabled ? 'bg-[#0a0a0a7e] cursor-not-allowed' : 'bg-[#0a0a0a] cursor-pointer hover:scale-[1.02] transition-all duration-500'}`}
                        >
                            {isDisabled ? 'Loading...' : 'Proceed to the Account'}
                            <img src="/next.png" alt="proceed icon" className={`max-w-4 ${isDisabled && 'hidden'}`} />
                        </button>
                    </form>
                    <div className={`w-[60%] flex justify-center items-center mt-3`}>
                        <span className='h-[1px] bg-black w-[45%]'></span>
                        <span className='px-2'>or</span>
                        <span className='h-[1px] bg-black w-[45%]'></span>
                    </div>
                    <div>

                    </div>
                    <p onClick={() => {navigate('/sign-up'); setState('register')}} className='text-xs text-blue-900 text-center cursor-pointer hover:underline hover:underline-offset-4 mt-3 w-fit'>Don't have an account? Create one!</p>
                </div>
            </div>
        </div>
    )
}

export default Login
