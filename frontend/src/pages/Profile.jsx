import React, { useContext, useState } from 'react'
import AppContext from '../context/AppContext';

const Profile = () => {
    const { setExistingUser } = useContext(AppContext);

    const [image, setImage] = useState('/profile.png');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const handleImage = (e) => {
        const file = e.target.files[0];
        if(file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setExistingUser(true);
    }

    return (
        <div className='w-full h-screen flex flex-col md:flex-row'>
            {/* Profile Upload */}
            <div className='md:w-2/5 w-full md:h-full max-sm:2/3 h-1/2 max-md:flex-row max-sm:flex-col flex-col flex justify-center items-center md:items-center sm:items-end gap-10 md:bg-[#a9a89b] max-md:text-[#a9a89b] max-md:mt-10'>
                <div className='border-2 md:border-black border-[#a9a89b] aspect-[1/1] md:w-4/5 w-2/5 max-sm:w-60 overflow-hidden p-2 rounded-lg flex justify-center items-center text-center text-sm'>
                    {image !== '/profile.png' ? <img src={image} alt="Profile Image Preview" className='w-fit h-full object-cover rounded-lg' /> : 'Upload Profile Image'}
                </div>
                <label htmlFor="imageUpload" className='bg-transparent border-2 border-dashed text-sm md:border-black border-[#a9a89b] rounded-md max-w-60 py-5 px-7 cursor-pointer flex gap-5 self-center max-sm:mt-0 max-md:mt-15'>
                    {image !== '/profile.png' ? 'Change Profile Image' : 'Upload Profile Image'}
                    <img src="/black-upload.png" alt="Upload Icon" className='w-5 h-fit max-md:hidden' />
                    <img src="/yellow-upload.png" alt="Upload Icon" className='w-5 h-fit md:hidden' />
                </label>
                <input 
                    id='imageUpload'
                    type="file" 
                    accept='image/*'
                    onChange={handleImage}
                    className='hidden'
                />
            </div>

            {/* Form Filling */}
            <div className='md:w-3/5 w-full md:h-full max-sm:h-1/3 h-1/2 max-md:flex-row max-sm:flex-col flex-col flex justify-center items-end'>
                <form onSubmit={handleSubmit} className='md:bg-[#a9a89b]/30 flex flex-col max-md:items-center max-md:justify-center max-md:w-full max-md:h-full w-4/5 h-3/7 rounded-l-2xl relative px-15'>
                    <h1 className='absolute max-md:text-2xl max-sm:-top-103 max-md:-top-93 max-md:left-22 text-4xl text-white text-extrabold -top-5 self-start'>User Profile</h1>
                    <div className='xl:w-[60%] max-sm:w-full w-[90%] max-sm:flex-wrap flex sm:justify-center items-center sm:gap-7 mt-10'>
                        <label className="text-md text-white w-1/5 sm:px-4">Name</label>
                        <input 
                            type="text" 
                            onChange={(e) => {setName(e.target.value)}}
                            value={name}
                            required
                            defaultValue={name}
                            className='w-4/5 max-sm:w-full outline-none text-md py-2 px-4 mt-1 border rounded-lg border-white/30 focus:border-white transition-all duration-200 text-white' 
                        />
                    </div>
                    <div className='xl:w-[60%] max-sm:w-full w-[90%] max-sm:flex-wrap flex sm:justify-center items-center sm:gap-8 mt-5'>
                        <label className="text-md text-white w-1/5 sm:px-4">Bio</label>
                        <textarea 
                            onChange={(e) => {setBio(e.target.value)}}
                            value={bio}
                            rows={4}
                            required
                            className='w-4/5 max-sm:w-full outline-none text-md py-2 px-4 border rounded-lg border-white/30 focus:border-white transition-all duration-200 text-white resize-none' 
                        ></textarea>
                    </div>
                    <button
                        type='submit'
                        className='xl:w-[60%] max-sm:w-full w-[90%] text-black bg-[#a9a89b] mt-7 py-2 rounded-lg sm:ml-4 cursor-pointer hover:scale-[1.02] transition-all duration-300'
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Profile
