import React, { useContext, useEffect, useRef, useState } from 'react'
import AppContext from '../context/AppContext'
import { formatTime } from '../libs/utils';
import toast from 'react-hot-toast';

const ChatSection = () => {
    const scrollEndRef = useRef();

    const { 
        selectedUser, 
        setSelectedUser, 
        setShowUserProfileSec, 
        chatSecRef, 
        messages, 
        sendMessage, 
        getMessages, 
        authUser, 
        onlineUsers } = useContext(AppContext)

    const [input, setInput] = useState('');

    const handleUserProfileSection = () => {
        if(window.innerWidth < 768) {
            if(chatSecRef.current) {
                chatSecRef.current.classList.add('hidden');
                setShowUserProfileSec(true);
            }
        }
    }

    // Function to handle sending of an image
    const handleImageSend = async (e) => {
        const file = e.target.files[0];
        if(!file || !file.type || !file.type.startsWith('image/')) {
            toast.error('Select an image file');
        }
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result;
            if(base64Image) {
                await sendMessage({ image: reader.result });
                e.target.value = '';
            } else {
                toast.error('Sending image failed. Please try again!')
            }
        }
        reader.readAsDataURL(file);
    }

    // Function to handle sending of a message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if(input.trim() === '') {
            return null
        }
        await sendMessage({ text: input.trim() });
        setInput('');
    }

    useEffect(() => {
        const fetchAndScroll = async () => {
            if (selectedUser) {
                await getMessages(selectedUser._id);
                // Scroll after messages are rendered
                setTimeout(() => {
                    if (scrollEndRef.current) {
                        scrollEndRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'end',
                            inline: 'nearest',
                        });
                    }
                }, 0);
            }
        };

        fetchAndScroll();
    }, [selectedUser]);

    return (
        <div ref={chatSecRef} id='chat-section' className={`w-full h-[90vh] ${selectedUser !== null ? 'block' : 'hidden'} md:pr-12 lg:pl-12 md:border-r md:border-white/30`}>
            {/* Info Section */}
            <div className={`flex justify-between items-center border-b border-white/30`}>
                <div className='flex items-center gap-3 py-4'>
                    <img src="/back.png" alt="back" onClick={() => {setSelectedUser(null)}} className='w-4 cursor-pointer' />
                    <div onClick={handleUserProfileSection} className='flex items-center gap-3 cursor-pointer'>
                        <img src={selectedUser?.profilePic || '/avatar.png'} alt="profile picture" className='w-[40px] h-fit aspect-[1/1] rounded-full border-2 border-[#6f6e65] object-center object-cover' />
                        <p className='text-[#8c8b80] font-semibold'>{selectedUser?.name}</p>
                    </div>
                    {
                        onlineUsers.includes(selectedUser?._id) &&(
                            <div className='h-2 w-2 bg-green-600 rounded-full'></div>
                        )
                    }
                </div>
                <img src="/info.png" alt="more information" className='w-[22px] h-fit cursor-pointer' />
            </div>

            {/* Chatting Section */}
            <div className='overflow-y-scroll h-[66vh] mt-3'>
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 justify-end ${msg?.senderId !== authUser?._id && 'flex-row-reverse'}`}>
                        {
                            msg?.image ? (
                                <img src={msg.image} alt="image" className={`max-w-[230px] border border-[#a9a89b] rounded-lg overflow-hidden mb-8 ${msg?.senderId === authUser?._id ? 'rounded-br-none' : 'rounded-bl-none'}`} />
                            ) : (
                                <p className={`p-2 max-w-[200px] text-sm font-light rounded-lg mb-8 break-all ${msg?.senderId === authUser?._id ? 'bg-[#a9a89b] text-black rounded-br-none' : 'bg-[#464540] text-white rounded-bl-none'}`}>{msg.text}</p>
                            )
                        }
                        <div className='text-center text-xs'>
                            <img 
                                src={msg?.senderId === authUser?._id ? authUser?.profilePic || '/avatar.png' : selectedUser?.profilePic || '/avatar.png'} 
                                alt={msg?.senderId === authUser?._id ? 'receiver\'s profile image' : 'sender\'s profile image'} 
                                className='w-8 rounded-full aspect-[1/1] h-fit object-cover object-center' 
                            />
                            <p className='text-white/30'>{formatTime(msg.createdAt)}</p>
                        </div>
                    </div>
                ))}
                <span ref={scrollEndRef} className='w-0 h-0'></span>
            </div>

            {/* Messaging Section */}
            <div className='flex items-center max-sm:gap-3 gap-5 max-sm:mt-5 mt-3 text-justify'>
                <div className='flex w-[93%] gap-3 border rounded-full border-[#6f6e65] max-sm:py-2 py-3'>
                    <input 
                        type="text" 
                        onChange={(e) => {setInput(e.target.value)}}
                        value={input}
                        onKeyDown={(e) => {e.key === 'Enter' ? handleSendMessage(e) : null}}
                        placeholder='Send a message...' 
                        className='w-[90%] outline-none px-5 text-sm' 
                    />
                    <input 
                        type="file"
                        onChange={handleImageSend} 
                        id='image' 
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        hidden 
                    />
                    <label htmlFor="image">
                        <img src="/gallery.png" alt="gallery upload" className='cursor-pointer pr-5' />
                    </label>
                </div>
                <img 
                    src="/send.png" 
                    alt="send message" 
                    onClick={handleSendMessage}
                    className='max-sm:w-[35px] w-[42px] cursor-pointer text-sm md:hover:scale-105 transition-all duration-300' 
                />
            </div>
        </div>
    )
}

export default ChatSection
