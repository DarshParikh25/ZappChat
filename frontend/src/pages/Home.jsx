import React, { useContext } from 'react'
import ChatOptionsSection from '../components/ChatOptionsSection'
import ChatSection from '../components/ChatSection'
import UserProfileSection from '../components/UserProfileSection'
import AppContext from '../context/AppContext'

const Home = () => {

    const { selectedUser } = useContext(AppContext);

    return (
        <div className='w-full h-[90vh] pt-5'>
            <div className={`text-white overflow-hidden grid grid-cols-1 h-[100%] relative ${Object.keys(selectedUser).length > 0 ? 'md:grid-cols-[2fr_1fr] lg:grid-cols-[1.2fr_1.8fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
                <ChatOptionsSection />
                <ChatSection />
                <UserProfileSection />
            </div>
        </div>
    )
}

export default Home
