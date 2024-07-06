import React from 'react'
import LeftSidebar from '../Components/LeftSidebar'
import RightSidebar from '../Components/RightSidebar'

function MessagesPage() {
    return (
        <div className='flex flex-row justify-center'>
            {/* Left Sidebar */}
            <LeftSidebar />

            {/* Feed */}
            {/* <Feed /> */}
            <div className='w-[500px] border-l border-r pb-10'>
                <h1>All Messages</h1>
            </div>

            {/* Right Sidebar */}
            <RightSidebar />
        </div>
    )
}

export default MessagesPage