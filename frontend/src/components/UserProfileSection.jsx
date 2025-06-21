import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext'

const UserSection = () => {
    const { selectedUser, setShowUserProfileSec, imagesDummyData } = useContext(AppContext);

    const navigate = useNavigate();

    const handleUserProfileSec = () => {
        setShowUserProfileSec(false);
        if(window.innerWidth < 768) {
            const chatElement = document.querySelector('#chat-section');
            if(chatElement) {
                chatElement.classList.remove('hidden');
            }
        }
    }

    return (
        <div className='relative md:pl-12 h-[100%]'>
            {
                Object.keys(selectedUser).length > 0 ? (
                    <>
                        {/* Back Icon For Small and Medium Screens */}
                        <img src="/back.png" alt="back" onClick={handleUserProfileSec} className='md:hidden absolute top-7 left-0 w-4 cursor-pointer' />

                        {/* Displaying User's Profile Information */}
                        <div className='w-[calc(100% - 3rem)] flex flex-col pt-14 pb-10 items-center border-b border-white/30 gap-3'>
                            <img src={selectedUser?.profilePic || '/avatar.png'} alt="profile image" className='w-fit' />
                            <div className='flex justify-center items-center gap-2'>
                                {
                                    selectedUser?.status === 'Online' &&(
                                        <div className='h-[10px] w-[10px] bg-green-600 rounded-full'></div>
                                    )
                                }
                                <h1 className='text-[#c7c5b6] font-semibold'>{selectedUser?.name}</h1>
                            </div>
                            <p className='text-center text-xs w-[80%] font-light text-white tracking-wider'>{selectedUser?.bio}</p>
                        </div>

                        {/* Displaying media shared in the chat */}
                        <div className='py-5 pl-3 flex flex-col gap-3'>
                            <p className='text-[#c7c5b6]'>Media</p>
                            <div className='overflow-y-scroll max-h-[43vh] grid grid-cols-2 gap-5'>
                                {imagesDummyData.map((url, index) => (
                                    <div key={index} onClick={() => {window.open(url)}} className='cursor-pointer rounded'>
                                        <img src={url} alt="images shared" className='rounded-md h-full' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    // Displaying website information as no user is selected to chat
                    <div className='h-[95%] w-full max-md:hidden flex flex-col justify-center items-center gap-10'>
                        <img src="/favicon.png" alt="logo" onClick={() => {navigate('/')}} className='max-w-40 cursor-pointer' />
                        <div className='flex flex-col text-center'>
                            <p className='tracking-wider flex flex-wrap justify-center text-lg text-[#a9a89b]'><span>Built to <span className='font-semibold text-[#c7c5b6]'>Connect</span>.</span> <span>Designed for <span className='font-semibold text-[#c7c5b6]'>Speed</span>.</span></p>
                            <p className='font-light'>Start chatting in seconds — no installs, no delays.</p>
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}

export default UserSection
