import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const ChatOptionsSection = () => {

    const { selectedUser, setSelectedUser } = useContext(AppContext);

    const [selectedIndex, setSelectedIndex] = useState(null);

    const [datas, setDatas] = useState([
        {
            name: 'Darsh Parikh',
            status: 'Online',
            newMess: 3
        },
        {
            name: 'Fardeen Malik',
            status: 'Online'
        },
        {
            name: 'Hriday Patel',
            status: 'Offline',
            newMess: 3
        },
        {
            name: 'Anubhav Pariya',
            status: 'Offline'
        },
        {
            name: 'Sauvik Nandi',
            status: 'Offline',
            newMess: 1
        },
        {
            name: 'Divyanshu Manjhi',
            status: 'Offline',
            newMess: 0
        },
        {
            name: 'Bishal Nag',
            status: 'Online',
            newMess: 2
        },
        {
            name: 'Rupak S V',
            status: 'Offline',
            newMess: 3
        },
        {
            name: 'Sourin Roy',
            status: 'Offline',
            newMess: 0
        },
    ])

    const handleNewMessages = (index) => {
        const updatedDatas = [...datas]; // shallow copy
        updatedDatas[index] = {...updatedDatas[index], newMess: 0};
        setDatas(updatedDatas);
    }

    return (
        <div className={`text-[#c7c5b6] ${selectedUser ? 'max-md:hidden' : ''} pr-12 border-r border-white/30`}>
            <div className='flex gap-3 items-center border border-[#c7c5b6] rounded-full py-3 px-4 my-5'>
                <img src="./src/assets/search.png" alt="search" width={12} />
                <input type="text" placeholder='Search User...' className='outline-none bg-transparent border-none text-xs placeholder-[#fff] flex-1' />
            </div>

            <div className='overflow-y-scroll h-screen'>
                {datas.map((data, index) => (
                    <div onClick={() => {
                            setSelectedUser(true); 
                            setSelectedIndex(index); 
                            handleNewMessages(index)
                        }} 
                        className={
                            `flex items-center justify-between hover:bg-[#1d1d1d] 
                            ${selectedIndex === index ? 'bg-[#1d1d1d]' : ''} 
                            pr-5 pl-4 py-2 transition-all duration-200 cursor-pointer rounded-full mt-3`
                        }
                    >
                        <div className='flex gap-5'>
                            <img src={'./src/assets/avatar.png'} alt="profile picture" className='w-[35px] h-fit aspect-[1/1] rounded-full border-2 border-[#6f6e65]' />
                            <div className='flex flex-col leading-5'>
                                <p className='font-semibold'>{data?.name}</p>
                                <p className={`${data.status === 'Online' ? 'text-xs text-[#a9a89b] font-medium' : 'text-xs text-[#6f6e65]'}`}>{data?.status}</p>
                            </div>
                        </div>
                        <p className={`text-sm text-black bg-[#c7c5b6] rounded-full w-5 h-5 flex justify-center items-center font-semibold ${selectedIndex != index && data.newMess > 0 ? 'block' : 'hidden'}`}>{data?.newMess}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatOptionsSection
