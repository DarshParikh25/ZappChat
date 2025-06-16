import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div onClick={() => navigate('/')} className='flex justify-between items-center cursor-pointer h-fit'>
            <div className='flex gap-3 justify-center items-center'>
                <img src="/favicon.png" alt="" width={35} />
                <img src="./src/assets/logo.png" alt="logo" width={160} className='' />
            </div>
            <div className='relative md:hidden justify-center items-center'>
                <img onClick={() => {setMenuOpen(!menuOpen)}} src="./src/assets/menu.png" alt="menu" className='cursor-pointer' />
                <div className={`z-50 absolute ${menuOpen ? 'block' : 'hidden'} bg-[#a9a89b] text-black text-sm px-3 py-2 flex flex-col w-max right-0 rounded-xl mt-3`}>
                    <p onClick={() => {navigate('/profile')}} className='cursor-pointer border-b border-black pb-2'>Edit Profile</p>
                    <p className='pt-2 cursor-pointer'>Logout</p>
                </div>
            </div>
            <div className='flex gap-7 max-md:hidden justify-center items-center text-sm'>
                <p onClick={() => navigate('/profile')} className='cursor-pointer text-[#c7c5b6] underline underline-offset-4 hover:scale-[1.03] transition-all duration-500'>Edit Profile</p>
                <button className='cursor-pointer bg-[#c7c5b6] rounded-full px-5 py-2 hover:bg-[#a9a89b]'>Logout</button>
            </div>
        </div>
    )
}

export default Navbar
