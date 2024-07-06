import React, { useEffect, useState } from 'react'
import LeftSidebar from '../Components/LeftSidebar'
import RightSidebar from '../Components/RightSidebar'
import { useParams } from 'react-router-dom'
import { doc, onSnapshot } from 'firebase/firestore'
import { dB } from '../firebase'

function UserProfile() {

    const { friendId } = useParams()

    const [friendsData, setfriendsData] = useState(null)
    useEffect(() => {
        onSnapshot(doc(dB, "USERS", friendId), (friendsDoc) => {
            if (friendsDoc.exists) {
                setfriendsData(friendsDoc.data())
            }
        })
    }, [friendId])

    return (
        <div className='flex flex-row justify-center'>
            {/* Left Sidebar */}
            <LeftSidebar />

            {/* Feed */}
            {/* <Feed /> */}
            <div className='w-[500px] border-l border-r pb-10'>
                <h1>{friendsData?.USER_NAME}</h1>
                <h1>{friendsData?.USER_HANDLE_ID}</h1>
                <h1>{friendsData?.USER_CREATED_ON?.toDate().toDateString()}</h1>
                <h1>{friendsData?.USER_EMAIL}</h1>
                <h1>{friendsData?.USER_PASSWORD}</h1>
            </div>

            {/* Right Sidebar */}
            <RightSidebar />
        </div>
    )
}

export default UserProfile