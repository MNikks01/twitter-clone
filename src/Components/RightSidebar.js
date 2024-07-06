import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { dB } from '../firebase';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function RightSidebar() {

    const [allUsers, setallUsers] = useState([])
    useEffect(() => {
        onSnapshot(collection(dB, 'USERS'), (snapshot) => {
            // snapshot.docs.forEach((oneDoc) => {
            //     setallUsers(prev => [...prev, oneDoc.data()])
            // })
            setallUsers(snapshot.docs.map((oneDoc) =>
            ({
                userData: oneDoc.data(),
                userDocId: oneDoc.id
            })
            ))
        })
    }, [])

    return (
        <div className='w-[280px] h-screen m-2'>
            <div className='bg-gray-100 w-full p-2 rounded-lg'>
                <h1 className='text-xl font-bold p-2'>Who to Follow</h1>

                <div>

                    {
                        allUsers.map((user, id) => (
                            <div key={id} className='flex flex-row items-center 
                        hover:bg-slate-200 hover:cursor-pointer transition duration-200
                        p-2 '>
                                {/* user image avatar */}
                                <img
                                    src="https://images.unsplash.com/photo-1682687982502-1529b3b33f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                    alt="User Name"
                                    className='w-11 h-11 rounded-full'
                                />

                                <div className='ml-2'>
                                    {/* user name */}
                                    <Link to={`/userprofile/${user?.userDocId}`}>
                                        <h2 className='text-lg hover:underline'>{user?.userData?.USER_NAME}</h2>
                                    </Link>

                                    {/* handle Id */}
                                    <p className='text-md text-gray-500'>@{user?.userData?.USER_HANDLE_ID}</p>
                                </div>

                                {/* Follow Button  */}
                                <button className='ml-3 bg-black text-white py-2 px-4 rounded-full font-semibold hover:bg-black/75 hover:cursor-pointer'>Follow</button>
                            </div>
                        ))
                    }


                </div>

            </div>
        </div>
    )
}

export default RightSidebar