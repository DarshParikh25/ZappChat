import React, { useContext, useState } from 'react'
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
    const { updateProfile, setNav } = useContext(AppContext);

    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState('/profile.png'); // For preview
    const [imageFile, setImageFile] = useState(null); // For upload
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user selected a new image
        if(imageFile) {
            try {
                const reader = new FileReader();
                reader.readAsDataURL(imageFile);
                reader.onload = async () => {
                    const base64Image = reader.result;
                    const res = await updateProfile({
                        name,
                        bio,
                        profilePic: base64Image
                    });
                    if (res?.success) {
                        setNav(true);
                        navigate('/');
                    }
                }
                reader.onerror = () => {
                    toast.error('Failed to upload image. Please try again!');
                };
            } catch (error) {
                toast.error(error.message);
            }
            
        } else {
            // User didn't select any image — use default profile image
            const res = await updateProfile({
                name,
                bio,
                profilePic: import.meta.env.VITE_DEFAULT_CLOUDINARY_PROFILE_PIC_URL
            });
            if (res?.success) {
                setNav(true);
                navigate('/');
            }
        }
    }

    return (
        <div className="flex flex-col md:flex-row w-full h-screen bg-black">
        {/* Profile Image Section */}
            <div className="flex flex-col items-center justify-center gap-6 w-full md:w-2/5 lg:w-1/2 h-1/2 md:h-full text-white py-10">
                <div className="w-40 max-w-[300px] md:w-3/5 aspect-square overflow-hidden rounded-lg border-2 border-white flex items-center justify-center text-sm">
                    {previewImage !== '/profile.png' ? (
                        <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        'Upload Profile Image'
                    )}
                </div>
                <label htmlFor="imageUpload" className="flex items-center gap-3 px-5 py-2 border-2 border-dashed rounded-md cursor-pointer hover:bg-white/10 transition max-md:text-sm">
                    {previewImage !== '/profile.png' ? 'Change Image' : 'Upload Image'}
                    <img src="/upload.png" className="w-5" />
                </label>    
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                />
            </div>

            {/* Profile Form Section */}
            <div className="flex flex-col justify-center items-center md:items-end w-full md:w-3/5 lg:w-1/2 h-1/2 md:h-full text-black md:py-10 pl-10 pb-0 max-md:pr-10 max-sm:p-0">
                <form onSubmit={handleSubmit} className="w-full h-full max-w-2xl bg-[#a9a89b] py-8 sm:px-8 md:rounded-r-none max-md:rounded-b-none rounded-xl text-sm flex flex-col justify-center items-center">
                    <h1 className="md:text-4xl text-2xl font-bold text-center mb-5 md:mb-12">User Profile</h1>

                    <div className="mb-6 w-full max-w-[80%]">
                        <label className="block mb-1 text-black">Name</label>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            className="w-full p-2 border border-white rounded-lg focus:outline-none focus:ring focus:border-black transition-all duration-200 text-sm"
                        />
                    </div>

                    <div className="mb-6 w-full max-w-[80%]">
                        <label className="block mb-1 text-black">Bio</label>
                        <textarea
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
                            rows={4}
                            required
                            className="w-full p-2 border border-white rounded-lg resize-none focus:outline-none focus:ring focus:border-black transition-all duration-200 text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-[80%] py-2 bg-[#c7c5b6] text-black rounded-lg hover:scale-[1.02] transition-all duration-500 cursor-pointer mt-6 font-semibold"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Profile