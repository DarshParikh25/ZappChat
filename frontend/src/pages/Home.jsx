import React, { useContext } from 'react'
import ChatOptionsSection from '../components/ChatOptionsSection'
import ChatSection from '../components/ChatSection'
import UserSection from '../components/UserSection'
import { AppContext } from '../context/AppContext'

const Home = () => {

    const { selectedUser } = useContext(AppContext);

    return (
        <div className='w-full h-[90vh] py-5'>
            <div className={`text-white overflow-hidden grid grid-cols-1 h-[100%] relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
                <ChatOptionsSection />
                <ChatSection />
                <UserSection />
            </div>
        </div>
    )
}

export default Home
