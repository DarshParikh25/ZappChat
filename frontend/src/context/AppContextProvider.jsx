import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

import AppContext from "./AppContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

const AppContextProvider = (props) => {
    const chatSecRef = useRef();
    const previousPathRef = useRef();

    const location = useLocation();
    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState({});
    const [showUserProfileSec, setShowUserProfileSec] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [state, setState] = useState('login');
    const [nav, setNav] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
        // {
        //     _id: "1",
        //     name: 'Darsh Parikh',
        //     email: 'parikhdarsh121@gmail.com',
        //     profilePic: '/avatar.png',
        //     bio: "Success will come not immediately, but definitely!",
        //     status: 'Online',
        //     newMess: 3
        // }

    const messagesDummyData = [
        {
            "_id": "680f571ff10f3cd28382f094",
            "senderId": "680f5116f10f3cd28382ed02",
            "receiverId": "680f50e4f10f3cd28382ecf9",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "seen": true,
            "createdAt": "2025-04-28T10:23:27.844Z",
        },
        {
            "_id": "680f5726f10f3cd28382f0b1",
            "senderId": "680f50e4f10f3cd28382ecf9",
            "receiverId": "680f5116f10f3cd28382ed02",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "seen": true,
            "createdAt": "2025-04-28T10:23:34.520Z",
        },
        {
            "_id": "680f5729f10f3cd28382f0b6",
            "senderId": "680f5116f10f3cd28382ed02",
            "receiverId": "680f50e4f10f3cd28382ecf9",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "seen": true,
            "createdAt": "2025-04-28T10:23:37.301Z",
        },
        {
            "_id": "680f572cf10f3cd28382f0bb",
            "senderId": "680f50e4f10f3cd28382ecf9",
            "receiverId": "680f5116f10f3cd28382ed02",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "seen": true,
            "createdAt": "2025-04-28T10:23:40.334Z",
        },
        {
            "_id": "680f573cf10f3cd28382f0c0",
            "senderId": "680f50e4f10f3cd28382ecf9",
            "receiverId": "680f5116f10f3cd28382ed02",
            "image": '/avatar.png',
            "seen": true,
            "createdAt": "2025-04-28T10:23:56.265Z",
        },
        {
            "_id": "680f5745f10f3cd28382f0c5",
            "senderId": "680f5116f10f3cd28382ed02",
            "receiverId": "680f50e4f10f3cd28382ecf9",
            "image": '/avatar.png',
            "seen": true,
            "createdAt": "2025-04-28T10:24:05.164Z",
        },
        {
            "_id": "680f5748f10f3cd28382f0ca",
            "senderId": "680f5116f10f3cd28382ed02",
            "receiverId": "680f50e4f10f3cd28382ecf9",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "seen": true,
            "createdAt": "2025-04-28T10:24:08.523Z",
        }
    ]
    
    const imagesDummyData = ['/pic1.png', '/pic2.png','/pic3.png','/pic4.png','/pic1.png','/pic2.png']

    useEffect(() => {
        const currentPath = location.pathname;
        const previousPath = previousPathRef.current;

        // Set nav as true if user goes back from /profile to /
        if (currentPath === '/' && previousPath === '/profile') {
            setNav(true);
        }

        // Prevent back to login/signup if user is already logged in and authenticated
        const publicRoutes = ['/login', '/sign-up'];
        if (loggedIn && authUser !== null && publicRoutes.includes(currentPath)) {
            navigate('/', { replace: true });
        }

        // Store current path for next render
        previousPathRef.current = currentPath;
    }, [location.pathname, loggedIn, authUser]);

    // Function to handle socket connection and online users updates
    const connectSocket = async (userData) => {
        if(!userData || socket?.connected) {
            return;
        }
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id
            }
        })
        setSocket(newSocket);
        newSocket.on('getOnlineUsers', (userIds) => {
            setOnlineUsers(userIds);
        })
    }
    
    // Check if the user is authenticated or not. If yes, then set the user's data and connect to the socket
    const checkAuth = async () => {
        try {
            const { data } = await axios.get('/api/auth/check');
            if(data.success) {
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Handle login for user authentication and socket connection
    const login = async (credentials) => {
        try {
            const { data } = await axios.post('/api/auth/login', credentials);
            if(data.success) {
                setSocket(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common['token'] = data.token;
                setAuthUser(data.userData);
                localStorage.setItem('token', data.token);
                toast.success(data.message);
                return { success: true };
            } else {
                toast.error(data.message);
                return { success: false };
            }
        } catch (error) {
            toast.error(error.message);
            return { success: false };
        }
    }

    // Handle login for user authentication and socket connection
    const register = async (credentials) => {
        try {
            const { data } = await axios.post('/api/auth/sign-up', credentials);
            if(data.success) {
                setSocket(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common['token'] = data.token;
                // setAuthUser(data.userData);
                localStorage.setItem('token', data.token);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // handle logout for user logout and socket disconnection
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setAuthUser(null);
        setNav(false);
        setLoggedIn(false);
        setOnlineUsers([]);
        delete axios.defaults.headers.common['token'];
        toast.success('Logged out successfully!');
        if(socket) {
            socket.disconnect();
            setSocket(null);
        }
    }

    // Update user's profile
    const updateProfile = async (updatedFields) => {
        try {
            const { data } = await axios.put('/api/auth/update-profile', updatedFields);
            if(data.success) {
                setAuthUser(data.user);
                toast.success('Profile Updated Successfully!');
                return { success: true }
            } else {
                toast.error(data.message);
                return { success: false }
            }
        } catch (error) {
            toast.error(error.message);
            return { success: false }
        }
    }

    useEffect(() => {
        if(token) {
            axios.defaults.headers.common['token'] = token;
        }
        checkAuth();
    }, [])

    const value = {
        selectedUser,
        setSelectedUser,
        onlineUsers,
        setOnlineUsers,
        chatSecRef,
        showUserProfileSec,
        setShowUserProfileSec,
        loggedIn, 
        setLoggedIn,
        messagesDummyData,
        imagesDummyData,
        state,
        setState,
        authUser,
        setAuthUser,
        nav,
        setNav,
        token,
        setToken,
        socket,
        setSocket,
        checkAuth,
        connectSocket,
        login,
        register,
        logout,
        updateProfile
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider