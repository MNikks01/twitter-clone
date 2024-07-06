import React from 'react'
import { MdVerified } from 'react-icons/md'
import { FaRegComment } from 'react-icons/fa'
import { FaRetweet } from 'react-icons/fa6'
import { AiOutlineHeart } from 'react-icons/ai'
import { GoShare } from 'react-icons/go'
import { BiPoll } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'

const PostOptions = [
    {
        icon: FaRegComment,
        number: 20,
    },
    {
        icon: FaRetweet,
        number: 20
    },
    {
        icon: AiOutlineHeart,
        number: 20
    },
    {
        icon: BiPoll,
        number: 20
    },
    {
        icon: GoShare,
    },
]


function Post(props) {

    const { postText, postImage, postTimestamp } = props

    return (
        <div className='flex flex-row p-2 border-b border-gray-200'>
            {/* left avatar */}
            <img
                src="https://images.unsplash.com/photo-1682687982502-1529b3b33f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="User Name"
                className='w-10 h-10 rounded-full m-2'
            />

            {/* right data */}
            <div className='p-1'>
                <div className='flex flex-row items-center justify-between'>

                    {/* userName, handleId, */}
                    <div className='flex flex-row items-center'>
                        <h1 className='text-lg font-semibold hover:underline hover:cursor-pointer'>Nikhil Shakya</h1>
                        <MdVerified className='text-blue-600 ml-1' />
                        <h2 className='text-md text-gray-600 ml-1 hover:cursor-pointer'>@nikhilShakya | <span className='hover:underline'>2h</span></h2>
                    </div>

                    {/* option three dots */}
                    <div className='p-2 rounded-full hover:bg-slate-200 hover:cursor-pointer'>
                        <BsThreeDots />
                    </div>
                </div>

                <div>
                    {/* postText */}
                    {
                        postText && (
                            <p className='text-md my-2'>{postText}</p>
                        )
                    }
                    {/* postImage */}
                    {
                        postImage && (
                            <img
                                src={postImage}
                                alt="User Name"
                                className=' rounded-lg border-10 max-h-[400px] max-w-[400px]'
                            />
                        )
                    }

                </div>

                <div className='flex flex-row items-center justify-around p-2'>
                    {/* Like, share, comment,  */}
                    {/* {
                        PostOptions.map((oneOpt, i) => (
                            <div  className='group hover:cursor-pointer flex flex-row items-center'>
                                <div className='p-2 group-hover:bg-blue-100 rounded-full'>
                                    <oneOpt.icon className='group-hover:text-blue-600 ' />
                                </div>
                                <p className=' group-hover:text-blue-600'>{oneOpt.number}</p>
                            </div>
                        ))
                    } */}
                    <div className='group hover:cursor-pointer transition duration-200 flex flex-row items-center'>
                        <div className='p-2 transition duration-200 group-hover:bg-blue-100 rounded-full'>
                            <FaRegComment className='transition duration-200 group-hover:text-blue-600 ' />
                        </div>
                        <p className=' transition duration-200 group-hover:text-blue-600'>123</p>
                    </div>

                    <div className='group hover:cursor-pointer transition duration-200 flex flex-row items-center'>
                        <div className='p-2 transition duration-200 group-hover:bg-green-100 rounded-full'>
                            <FaRetweet className='transition duration-200 group-hover:text-green-600 ' />
                        </div>
                        <p className=' transition duration-200 group-hover:text-green-600'>123</p>
                    </div>

                    <div className='group hover:cursor-pointer transition duration-200 flex flex-row items-center'>
                        <div className='p-2 transition duration-200 group-hover:bg-pink-100 rounded-full'>
                            <AiOutlineHeart className='transition duration-200 group-hover:text-pink-600 ' />
                        </div>
                        <p className=' transition duration-200 group-hover:text-pink-600'>123</p>
                    </div>

                    <div className='group hover:cursor-pointer transition duration-200 flex flex-row items-center'>
                        <div className='p-2 transition duration-200 group-hover:bg-blue-100 rounded-full'>
                            <BiPoll className='transition duration-200 group-hover:text-blue-600 ' />
                        </div>
                        <p className=' transition duration-200 group-hover:text-blue-600'>123</p>
                    </div>

                    <div className='group hover:cursor-pointer transition duration-200 flex flex-row items-center'>
                        <div className='p-2 transition duration-200 group-hover:bg-blue-100 rounded-full'>
                            <GoShare className='transition duration-200 group-hover:text-blue-600 ' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post