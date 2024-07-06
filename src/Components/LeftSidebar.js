import React, { useState } from 'react'

import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { MdNotificationsNone } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { CiViewList, CiCircleMore } from "react-icons/ci";
import { BsBookmark, BsPeople, BsThreeDots } from "react-icons/bs";
import { signOut } from 'firebase/auth';
import { auth, dB } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

const NAV_ITEMS = [
    {
        redirect: '/home',
        name: "Home",
        icon: AiOutlineHome,
    },
    {
        redirect: '/explore',
        name: "Explore",
        icon: BiSearch,
    },
    {
        redirect: '/notifications',
        name: "Notifications",
        icon: MdNotificationsNone,
    },
    {
        redirect: '/messages',
        name: "Messages",
        icon: HiOutlineMail,
    },
    {
        redirect: '/lists',
        name: "Lists",
        icon: CiViewList,
    },
    {
        redirect: '/bookmarks',
        name: "Bookmarks",
        icon: BsBookmark,
    },
    {
        redirect: '/communities',
        name: "Communities",
        icon: BsPeople,
    },
    // {
    //     redirect:'/home',
    //     name: "Verified",
    //     icon: FaXTwitter,
    // },
    {
        redirect: '/profile',
        name: "Profile",
        icon: AiOutlineUser,
    },
    // {
    //     redirect:'/home',
    //     name: "More",
    //     icon: CiCircleMore,
    // },
]

function LeftSidebar() {

    const navigate = useNavigate()

    const handleSignout = (e) => {
        e.preventDefault()

        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/login')
        }).catch((error) => {
            // An error happened.
        });
    }


    const [currentUser] = useState(auth.currentUser.uid)
    const [userData, setuserData] = useState(null)
    useEffect(() => {
        onSnapshot(doc(dB, "USERS", currentUser), (userDoc) => {
            if (userDoc.exists) {
                setuserData(userDoc.data())
            }
        })
    }, [currentUser])

    return (
        <div className='w-[250px]  h-screen flex flex-col justify-between '>

            <div>
                {/* Logo */}
                <Link to={'/home'}>
                    <div className='p-3 hover:bg-gray-200 
                        hover:cursor-pointer rounded-full w-fit'>
                        <FaXTwitter className='text-2xl' />
                    </div>
                </Link>

                {/* Options with Button */}
                <div>
                    {
                        NAV_ITEMS.map((item, index) => (
                            <Link to={item.redirect}>
                                <div key={index} className='flex flex-row items-center p-2 
                                    hover:cursor-pointer hover:bg-gray-200
                                    rounded-full w-fit px-4 transition duration-200'>
                                    <item.icon className='text-2xl' />
                                    <p className='text-xl ml-2'>{item.name}</p>
                                </div>
                            </Link>
                        ))
                    }
                    <button onClick={handleSignout} className='bg-blue-400 hover:bg-blue-600 rounded-full p-2 text-xl text-white w-full my-2 transition duration-200'>
                        Logout
                    </button>
                </div>
            </div>

            {/* User profile Button */}
            <div className='flex flex-row items-center justify-between 
            hover:bg-slate-200 hover:cursor-pointer transition duration-200
             p-2 rounded-full'>
                {/* user image avatar */}
                <img
                    src="https://images.unsplash.com/photo-1682687982502-1529b3b33f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="User Name"
                    className='w-12 h-12 rounded-full'
                />
                <div>
                    {/* user name */}
                    <h2 className='text-lg'>{userData?.USER_NAME}</h2>

                    {/* handle Id */}
                    <p className='text-md text-gray-500'>@{userData?.USER_HANDLE_ID}</p>
                </div>

                {/* icon */}
                <BsThreeDots className='text-xl' />
            </div>
        </div>
    )
}

export default LeftSidebar