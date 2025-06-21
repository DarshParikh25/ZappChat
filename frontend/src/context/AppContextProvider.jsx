import { useRef, useState } from "react";
import AppContext from "./AppContext";

const AppContextProvider = (props) => {
    const chatSecRef = useRef();

    const [selectedUser, setSelectedUser] = useState({});
    const [showUserProfileSec, setShowUserProfileSec] = useState(false);

    const [users, setUsers] = useState([
        {
            _id: "1",
            name: 'Darsh Parikh',
            email: 'parikhdarsh121@gmail.com',
            profilePic: '/avatar.png',
            bio: "Success will come not immediately, but definitely!",
            status: 'Online',
            newMess: 3
        },
        {
            _id: "2",
            name: 'Fardeen Malik',
            email: 'parikhdarsh121@gmail.com',
            profilePic: '/avatar.png',
            bio: "Success will come not immediately, but definitely!",
            status: 'Online'
        },
        {
            _id: "3",
            name: 'Hriday Patel',
            email: 'parikhdarsh121@gmail.com',
            profilePic: '/avatar.png',
            bio: "Success will come not immediately, but definitely!",
            status: 'Offline',
            newMess: 3
        },
        {
            _id: "4",
            name: 'Anubhav Pariya',
            email: 'parikhdarsh121@gmail.com',
            profilePic: '/avatar.png',
            bio: "Success will come not immediately, but definitely!",
            status: 'Offline'
        },
        {
            _id: "5",
            name: 'Sauvik Nandi',
            email: 'parikhdarsh121@gmail.com',
            profilePic: '/avatar.png',
            bio: "Success will come not immediately, but definitely!",
            status: 'Offline',
            newMess: 1
        },
        {
            _id: "6",
            name: 'Divyanshu Manjhi',
            email: 'parikhdarsh121@gmail.com',
            profilePic: '/avatar.png',
            bio: "Success will come not immediately, but definitely!",
            status: 'Offline',
            newMess: 2
        },
        {
            _id: "7",
            name: 'Bishal Nag',
            email: 'parikhdarsh121@gmail.com',
            profilePic: '/avatar.png',
            bio: "Success will come not immediately, but definitely!",
            status: 'Online',
            newMess: 2
        },
        {
            _id: "8",
            name: 'Rupak S V',
            email: 'parikhdarsh121@gmail.com',
            profilePic: '/avatar.png',
            bio: "Success will come not immediately, but definitely!",
            status: 'Offline',
            newMess: 3
        },
        {
            _id: "9",
            name: 'Sourin Roy',
            email: 'parikhdarsh121@gmail.com',
            profilePic: '/avatar.png',
            bio: "Success will come not immediately, but definitely!",
            status: 'Offline',
            newMess: 0
        },
        {
            _id: "10",
            name: 'Dhruti Khatsuriya',
            email: 'parikhdarsh121@gmail.com',
            profilePic: '/avatar.png',
            bio: "Success will come not immediately, but definitely!",
            status: 'Online',
            newMess: 2
        },
    ])

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

    const value = {
        selectedUser,
        setSelectedUser,
        users,
        setUsers,
        chatSecRef,
        showUserProfileSec,
        setShowUserProfileSec,
        messagesDummyData,
        imagesDummyData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider