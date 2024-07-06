import React from 'react'
import LeftSidebar from '../Components/LeftSidebar'
import Feed from '../Components/Feed'
import RightSidebar from '../Components/RightSidebar'

function Homepage() {
    return (
        <div className='flex flex-row justify-center'>
            {/* Left Sidebar */}
            <LeftSidebar />

            {/* Feed */}
            <Feed />


            {/* Right Sidebar */}
            <RightSidebar />
        </div>
    )
}

export default Homepage