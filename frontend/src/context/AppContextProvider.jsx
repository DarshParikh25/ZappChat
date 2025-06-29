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
    const hasLoggedOut = useRef(false);

    const location = useLocation();
    const navigate = useNavigate();

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [showUserProfileSec, setShowUserProfileSec] = useState(false);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null ? true : false);
    const [state, setState] = useState('login');
    const [nav, setNav] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authUser, setAuthUser] = useState(null);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [unseenMessages, setUnseenMessages] = useState({});
        // {
        //     _id: "1",
        //     name: 'Darsh Parikh',
        //     email: 'parikhdarsh121@gmail.com',
        //     profilePic: '/avatar.png',
        //     bio: "Success will come not immediately, but definitely!",
        //     status: 'Online',
        //     newMess: 3
        // }

    // const messagesDummyData = [
    //     {
    //         "_id": "680f571ff10f3cd28382f094",
    //         "senderId": "680f5116f10f3cd28382ed02",
    //         "receiverId": "680f50e4f10f3cd28382ecf9",
    //         "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //         "seen": true,
    //         "createdAt": "2025-04-28T10:23:27.844Z",
    //     },
    //     {
    //         "_id": "680f5726f10f3cd28382f0b1",
    //         "senderId": "680f50e4f10f3cd28382ecf9",
    //         "receiverId": "680f5116f10f3cd28382ed02",
    //         "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //         "seen": true,
    //         "createdAt": "2025-04-28T10:23:34.520Z",
    //     },
    //     {
    //         "_id": "680f5729f10f3cd28382f0b6",
    //         "senderId": "680f5116f10f3cd28382ed02",
    //         "receiverId": "680f50e4f10f3cd28382ecf9",
    //         "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //         "seen": true,
    //         "createdAt": "2025-04-28T10:23:37.301Z",
    //     },
    //     {
    //         "_id": "680f572cf10f3cd28382f0bb",
    //         "senderId": "680f50e4f10f3cd28382ecf9",
    //         "receiverId": "680f5116f10f3cd28382ed02",
    //         "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //         "seen": true,
    //         "createdAt": "2025-04-28T10:23:40.334Z",
    //     },
    //     {
    //         "_id": "680f573cf10f3cd28382f0c0",
    //         "senderId": "680f50e4f10f3cd28382ecf9",
    //         "receiverId": "680f5116f10f3cd28382ed02",
    //         "image": '/avatar.png',
    //         "seen": true,
    //         "createdAt": "2025-04-28T10:23:56.265Z",
    //     },
    //     {
    //         "_id": "680f5745f10f3cd28382f0c5",
    //         "senderId": "680f5116f10f3cd28382ed02",
    //         "receiverId": "680f50e4f10f3cd28382ecf9",
    //         "image": '/avatar.png',
    //         "seen": true,
    //         "createdAt": "2025-04-28T10:24:05.164Z",
    //     },
    //     {
    //         "_id": "680f5748f10f3cd28382f0ca",
    //         "senderId": "680f5116f10f3cd28382ed02",
    //         "receiverId": "680f50e4f10f3cd28382ecf9",
    //         "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //         "seen": true,
    //         "createdAt": "2025-04-28T10:24:08.523Z",
    //     }
    // ]
    
    // const imagesDummyData = ['/pic1.png', '/pic2.png','/pic3.png','/pic4.png','/pic1.png','/pic2.png']

    // Auth Context

    useEffect(() => {
        const currentPath = location.pathname;
        const previousPath = previousPathRef.current;

        // Set nav as true if user goes back from /profile to /
        if (currentPath === '/' && previousPath === '/profile') {
            setNav(true);
        }

        // Prevent back to login/signup if user is already logged in and authenticated
        const publicRoutes = ['/login', '/sign-up'];
        if (!loading && loggedIn && authUser !== null && publicRoutes.includes(currentPath)) {
            navigate('/', { replace: true });
        }

        // Store current path for next render
        previousPathRef.current = currentPath;
    }, [location.pathname, loggedIn, authUser, loading, navigate]);

    // Function to handle socket connection and online users updates
    const connectSocket = async (userData) => {
        // Avoid reconnecting
        if(!userData || socket?.connected) {
            return;
        }
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id
            }
        })
        newSocket.connect();
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
                setNav(true); // Ensures Navbar appears after reload
            }
        } catch {
            // Handle 401 error explicitly
            // if (error.response?.status === 401) {
            //     Object.keys(localStorage).forEach((key) => {
            //         if (key.startsWith('token')) {
            //             localStorage.removeItem(key);
            //         }
            //     });
            //     delete axios.defaults.headers.common['token'];
                setLoggedIn(false);
                setAuthUser(null);
                setNav(false);
            // } else if (error.response?.status === 403) {
            //     toast.error('You are not logged in.');
            // }
            // navigate('/login');
            // toast.error('Session expired or unauthorized.');
        } finally {
            setLoading(false);
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
                localStorage.setItem(`token`, data.token);
                setToken(data.token);
                toast.success(data.message);
                return { success: true, user: data.userData };
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
            console.log(credentials);
            const { data } = await axios.post('/api/auth/sign-up', credentials);
            console.log(data);
            if(data.success) {
                setSocket(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common['token'] = data.token;
                localStorage.setItem(`token`, data.token);
                setToken(data.token);
                setAuthUser(null);
                toast.success(data.message);
                setNav(false);
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

    // handle logout for user logout and socket disconnection
    const logout = () => {
        if (hasLoggedOut.current) return;
        hasLoggedOut.current = true;
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith('token')) {
                localStorage.removeItem(key);
            }
        });
        setToken(null);
        setAuthUser(null);
        setNav(false);
        setLoggedIn(false);
        setOnlineUsers([]);
        setSelectedUser(null);
        delete axios.defaults.headers.common['token'];
        if(socket) {
            socket.disconnect();
            setSocket(null);
        }
        toast.success('Logged out successfully!');
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
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    logout();
                    toast.error('Session expired. Please login again.');
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor); // Cleanup
        };
    }, [logout, navigate]);

    useEffect(() => {
        if(token) {
            axios.defaults.headers.common['token'] = token;
            checkAuth(); // Called only once on mount
        } else {
            setLoading(false);
        }
    }, [token])


    // Chat Context

    // Function to get all users to chat
    const getUsers = async () => {
        try {
            const { data } = await axios.get('/api/messages/users');

            if(data.success) {
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to get messages for selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);

            if(data.success) {
                setMessages(data.messages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to send messages to the selected user
    const sendMessage = async (message) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, message);

            if(data.success) {
                // This may work in synchronous scenarios, but can cause bugs if `messages` is stale due to async updates
                // setMessages([...messages, data.newMess]);

                // Use functional update to ensure we're appending to the latest state, especially important for async events like socket messages
                setMessages((prevMessages) => [...prevMessages, data.newMessage]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to subscribe to messages for selected user (to get the new messages in real-time)
    const subscribe = async () => {
        if(!socket) return;

        socket.on('newMessage', (newMessage) => {
            if(selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`)
            } else {
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages,
                    [newMessage.senderId] : prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }))
            }
        })
    }

    // Function to unsubscribe from messages for selected user (to close the conversation)
    const unsubscribe = async () => {
        if(socket) {
            socket.off('newMessage');
        }
    }

    useEffect(() => {
        subscribe()
        return () => {
            unsubscribe()
        }
    }, [socket, selectedUser])

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
        updateProfile,
        loading,
        setLoading,
        messages,
        users,
        unseenMessages,
        setUnseenMessages,
        getUsers,
        getMessages,
        sendMessage,
    }

    return (
        <AppContext.Provider value={ value }>
            { props.children }
        </AppContext.Provider>
    )
}

export default AppContextProvider