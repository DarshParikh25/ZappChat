import React, { useContext, useEffect, useRef } from 'react'
import AppContext from '../context/AppContext'
import { formatTime } from '../libs/utils';

const ChatSection = () => {
    const scrollEndRef = useRef();

    const { selectedUser, setSelectedUser, setShowUserProfileSec, chatSecRef, messagesDummyData } = useContext(AppContext)

    const handleUserProfileSection = () => {
        if(window.innerWidth < 768) {
            if(chatSecRef.current) {
                chatSecRef.current.classList.add('hidden');
                setShowUserProfileSec(true);
            }
        }
    }

    useEffect(() => {
        if(scrollEndRef.current) {
            scrollEndRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
            })
        }
    })

    return (
        <div ref={chatSecRef} id='chat-section' className={`w-full h-[90vh] ${Object.keys(selectedUser).length === 0 ? 'hidden' : 'block'} md:pr-12 lg:pl-12 md:border-r md:border-white/30`}>
            {/* Info Section */}
            <div className={`flex justify-between items-center border-b border-white/30`}>
                <div className='flex items-center gap-3 py-4'>
                    <img src="/back.png" alt="back" onClick={() => {setSelectedUser({})}} className='w-4 cursor-pointer' />
                    <div onClick={handleUserProfileSection} className='flex items-center gap-3 cursor-pointer'>
                        <img src={selectedUser?.profilePic || '/avatar.png'} alt="profile picture" className='w-[40px] h-fit aspect-[1/1] rounded-full border-2 border-[#6f6e65]' />
                        <p className='text-[#8c8b80] font-semibold'>{selectedUser?.name}</p>
                    </div>
                    {
                        selectedUser?.status === 'Online' &&(
                            <div className='h-2 w-2 bg-green-600 rounded-full'></div>
                        )
                    }
                </div>
                <img src="/info.png" alt="more information" className='w-[22px] h-fit cursor-pointer' />
            </div>

            {/* Chatting Section */}
            <div className='overflow-y-scroll h-[66vh] mt-3'>
                {messagesDummyData.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}>
                        {
                            msg.image ? (
                                <img src={msg.image} alt="image" className={`max-w-[230px] border border-[#a9a89b] rounded-lg overflow-hidden mb-8 ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none' : 'rounded-bl-none'}`} />
                            ) : (
                                <p className={`p-2 max-w-[200px] text-sm font-light rounded-lg mb-8 break-all ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'bg-[#a9a89b] text-black rounded-br-none' : 'bg-[#6f6e65] text-white rounded-bl-none'}`}>{msg.text}</p>
                            )
                        }
                        <div className='text-center text-xs'>
                            <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? selectedUser.profilePic || '/avatar.png' : '/avatar.png'} alt={msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'receiver\'s profile image' : 'sender\'s profile image'} className='w-8 rounded-full' />
                            <p className='text-white/30'>{formatTime(msg.createdAt)}</p>
                        </div>
                    </div>
                ))}
                <span ref={scrollEndRef} className='w-0 h-0'></span>
            </div>

            {/* Messaging Section */}
            <div className='flex items-center max-sm:gap-3 gap-5 max-sm:mt-5 mt-3 text-justify'>
                <div className='flex w-[93%] gap-3 border rounded-full border-[#6f6e65] max-sm:py-2 py-3'>
                    <input type="text" placeholder='Send a message...' className='w-[90%] outline-none px-5 text-sm' />
                    <input type="file" id='image' accept='image/png, image/jpeg, image/jpg' hidden />
                    <label htmlFor="image">
                        <img src="/gallery.png" alt="gallery upload" className='cursor-pointer pr-5' />
                    </label>
                </div>
                <img src="/send.png" alt="send message" className='max-sm:w-[35px] w-[42px] cursor-pointer text-sm md:hover:scale-105 transition-all duration-300' />
            </div>
        </div>
    )
}

export default ChatSection
