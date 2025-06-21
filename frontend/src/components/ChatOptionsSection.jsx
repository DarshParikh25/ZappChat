import React, { useContext } from 'react'
import AppContext from '../context/AppContext'

const ChatOptionsSection = () => {

    const { selectedUser, setSelectedUser, users, setUsers } = useContext(AppContext);

    const handleNewMessages = (index) => {
        const updatedUsers = [...users]; // shallow copy
        updatedUsers[index] = {...updatedUsers[index], newMess: 0};
        setUsers(updatedUsers);
    }

    return (
        <div className={`text-[#c7c5b6] ${Object.keys(selectedUser).length > 0 ? 'max-lg:hidden' : ''} md:border-r md:border-white/30 md:pr-12`}>
            <div className='flex gap-3 items-center border border-[#c7c5b6] rounded-full py-3 px-4 my-5'>
                <img src="/search.png" alt="search" width={12} />
                <input type="text" placeholder='Search User...' className='outline-none bg-transparent border-none text-xs placeholder-[#fff] flex-1' />
            </div>

            <div className='overflow-y-scroll h-[74vh]'>
                {users.map((user, index) => (
                    <div onClick={() => {
                            setSelectedUser(user);  
                            handleNewMessages(index)
                        }} 
                        key={index}
                        className={
                            `flex items-center justify-between
                            ${selectedUser._id === user._id ? 'bg-[#1d1d1d]' : 'bg-transparent hover:bg-[#1d1d1d]/70'} 
                            pr-5 pl-4 py-2 transition-all duration-300 cursor-pointer rounded-full mt-3`
                        }
                    >
                        <div className={`flex gap-5`}>
                            <img src={user?.profilePic || '/avatar.png'} alt="profile picture" className='w-[35px] h-fit aspect-[1/1] rounded-full border-2 border-[#6f6e65]' />
                            <div className={`flex flex-col leading-5 text-sm ${Object.keys(selectedUser).length > 0 ? 'lg:text-xs' : ''}`}>
                                <p className={`font-semibold`}>{user?.name}</p>
                                <p className={`${user.status === 'Online' ? 'text-xs text-green-600 font-medium' : 'text-xs text-[#6f6e65]'}`}>{user?.status}</p>
                            </div>
                        </div>
                        <p className={`text-sm ${Object.keys(selectedUser).length > 0 ? 'lg:text-xs lg:w-4 lg:h-4' : ''} text-black bg-[#c7c5b6] rounded-full w-5 h-5 flex justify-center items-center font-semibold ${selectedUser._id != user._id && user.newMess > 0 ? 'block' : 'hidden'}`}>{user?.newMess}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatOptionsSection
