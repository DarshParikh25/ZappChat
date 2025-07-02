import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'

const ChatOptionsSection = () => {
    const { selectedUser, setSelectedUser, users, getUsers, unseenMessages, onlineUsers, setUnseenMessages } = useContext(AppContext);

    const [input, setInput] = useState(false);

    const filteredUsers = input ? users?.filter((user) => (
        user.name.toLowerCase().includes(input.toLowerCase())
    )) : (users || [])

    useEffect(() => {
        getUsers()
    }, [onlineUsers, getUsers]);

    return (
        <div className={`text-[#c7c5b6] ${selectedUser !== null ? 'max-lg:hidden' : ''} md:border-r md:border-white/30 md:pr-12`}>
            <div className='flex gap-3 items-center border border-[#c7c5b6] rounded-full py-3 px-4 my-5'>
                <img src="/search.png" alt="search" width={12} />
                <input 
                    type="text" 
                    onChange={(e) => {setInput(e.target.value)}}
                    placeholder='Search User...' 
                    className='outline-none bg-transparent border-none text-xs placeholder-[#fff] flex-1' 
                />
            </div>

            <div className='overflow-y-scroll h-[74vh]'>
                {filteredUsers?.map((user, index) => (
                    <div onClick={() => {
                            setSelectedUser(user); 
                            setUnseenMessages((prev) => ({...prev, [user?._id]: 0}))
                        }} 
                        key={index}
                        className={
                            `flex items-center justify-between
                            ${selectedUser?._id === user._id ? 'bg-[#1d1d1d]' : 'bg-transparent hover:bg-[#1d1d1d]/70'} 
                            pr-5 pl-4 py-2 transition-all duration-300 cursor-pointer rounded-full mt-3`
                        }
                    >
                        <div className={`flex gap-5`}>
                            <img src={user?.profilePic || '/avatar.png'} alt="profile picture" className='w-[35px] h-fit aspect-[1/1] rounded-full border-2 border-[#6f6e65] object-cover object-center' />
                            <div className={`flex flex-col leading-5 text-sm ${selectedUser !== null ? 'lg:text-xs' : ''}`}>
                                <p className={`font-semibold`}>{user?.name}</p>
                                <p className={`${onlineUsers.includes(user._id) ? 'text-xs text-green-600 font-medium' : 'text-xs text-[#6f6e65]'}`}>{onlineUsers.includes(user._id) ? 'Online' : 'Offline'}</p>
                            </div>
                        </div>
                        <p className={`text-sm ${selectedUser !== null ? 'lg:text-xs lg:w-4 lg:h-4' : ''} text-black bg-[#c7c5b6] rounded-full w-5 h-5 flex justify-center items-center font-semibold ${unseenMessages[user._id] > 0 ? 'block' : 'hidden'}`}>{unseenMessages[user._id]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatOptionsSection
