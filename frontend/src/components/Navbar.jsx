import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();

    const { setNav, logout } = useContext(AppContext);

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className='flex justify-between items-center cursor-pointer h-fit'>
            <div onClick={() => {navigate('/'); setMenuOpen(false)}} className='flex md:gap-3 sm:gap-2 gap-1 justify-center items-center'>
                <img src="/favicon.png" alt="" className='md:w-[35px] sm:w-[33px] w-[30px]' />
                <img src="/logo.png" alt="logo" className='md:w-40 sm:w-36 w-30' />
            </div>
            <div className='relative md:hidden justify-center items-center'>
                <img onClick={() => {setMenuOpen(!menuOpen)}} src="/menu.png" alt="menu" className='cursor-pointer' />
                <div className={`z-50 absolute ${menuOpen ? 'block' : 'hidden'} bg-[#a9a89b] text-black text-sm text-center px-5 py-3 flex flex-col w-max top-full right-0 rounded-xl mt-3`}>
                    <p 
                        onClick={() => {
                            navigate('/profile'); 
                            setMenuOpen(false); 
                            setNav(false)
                        }} 
                        className='cursor-pointer border-b border-black pb-2 px-1'
                    >
                        Edit Profile
                    </p>
                    <p 
                        onClick={logout} 
                        className='pt-2 cursor-pointer'
                    >
                        Logout
                    </p>
                </div>
            </div>
            <div className='flex gap-7 max-md:hidden justify-center items-center text-sm'>
                <p 
                    onClick={() => {
                        navigate('/profile'); 
                        setMenuOpen(false); 
                        setNav(false)
                    }} 
                    className='cursor-pointer text-[#c7c5b6] underline underline-offset-4 hover:scale-[1.03] transition-all duration-500'
                >
                    Edit Profile
                </p>
                <button 
                    onClick={logout}
                    className='cursor-pointer bg-[#c7c5b6] rounded-full px-5 py-2 hover:bg-[#a9a89b]'
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar
