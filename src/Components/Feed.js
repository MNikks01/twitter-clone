import React, { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import Post from './Post'
import { collection, onSnapshot } from 'firebase/firestore'
import { dB } from '../firebase'

function Feed() {

    const [allPosts, setallPosts] = useState([])

    useEffect(() => {
        const path = collection(dB, 'POSTS')
        onSnapshot(path, (snapshot) => {
            // setallPosts(snapshot.docs.map((oneDoc) =>
            // ({
            //     postData: oneDoc.data(),
            //     postId: oneDoc.id
            // })
            // ))
            setallPosts(snapshot.docs.map((oneDoc) => oneDoc.data()))
        })
    }, [])
    console.log(allPosts);


    return (
        <div className='w-[500px] border-l border-r pb-10'>
            {/* Home & Toggle Button */}

            {/* Create Post Component */}
            <CreatePost />

            {/* One Post Component */}
            {
                allPosts.map((onePost, i) => (
                    <Post
                        key={i}
                        postText={onePost.POST_TEXT}
                        postImage={onePost.POST_IMAGE}
                        postTimestamp={onePost.POST_TIMESTAMP}
                    />
                ))
            }
        </div>
    )
}

export default Feed