import React, { useEffect, useState } from 'react'

import { FaPoll } from "react-icons/fa";
import { AiOutlineFileGif } from "react-icons/ai";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { GrLocation } from "react-icons/gr";

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { dB, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const OPTION_ICONS = [BsImage, AiOutlineFileGif, FaPoll, BsEmojiSmile, SlCalender, GrLocation]

function CreatePost() {

    const [postText, setpostText] = useState('')



    const [picture, setpicture] = useState(null)
    const handleSelectImage = (e) => {
        e.preventDefault();
        setpicture(null)
        if (e.target.files[0]) {
            setpicture(e.target.files[0])
        }
    }

    const [randomKey, setrandomKey] = useState(null)
    useEffect(() => {
        var a = Array.from(
            Array(20),
            () => Math.floor(Math.random() * 36).toString(36)
        ).join('');
        setrandomKey(a)
    }, [])


    const [uploadProgress, setuploadProgress] = useState(0)

    const handleCreatePost = () => {
        if (postText || picture) {
            if (picture) {

                const storageRef = ref(storage, `post/${randomKey}.jpg`);

                var uploadTask = uploadBytesResumable(storageRef, picture);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // monitor the upload
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setuploadProgress(progress)
                    },
                    (error) => {
                        // error
                        console.log(error);
                    },
                    () => {
                        // Handle successful uploads on complete
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                addDoc(collection(dB, "POSTS"), {
                                    POST_TEXT: postText,
                                    POST_IMAGE: downloadURL,
                                    POST_TIMESTAMP: serverTimestamp()
                                }).then(() => {
                                    setpostText("")
                                    setuploadProgress(0)
                                    var a = Array.from(
                                        Array(20),
                                        () => Math.floor(Math.random() * 36).toString(36)
                                    ).join('');
                                    setrandomKey(a)
                                }).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                    }
                )

            } else {
                addDoc(collection(dB, "POSTS"), {
                    POST_TEXT: postText,
                    POST_IMAGE: "",
                    POST_TIMESTAMP: serverTimestamp()
                }).then(() => {
                    setpostText("")
                }).catch(err => console.log(err))
            }
        }
    }

    return (
        <div className='flex flex-row p-2 border-b'>
            {/* left -> avatar */}
            <img
                src="https://images.unsplash.com/photo-1682687982502-1529b3b33f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="User Name"
                className='w-10 h-10 rounded-full m-2'
            />

            {/* right -> rest of the date */}
            <div>
                {/* top data */}
                <input
                    type="text"
                    className='w-full focus:outline-none p-3 my-1 text-xl'
                    placeholder="What is Happening?"
                    value={postText}
                    onChange={(e) => setpostText(e.target.value)}
                />

                {/* bottom data */}
                <div className='flex flex-row items-center justify-betwee'>
                    {/* 6 Icons */}
                    <div className='flex flex-row items-center'>
                        <input type="file" onChange={handleSelectImage} />
                        {/* {
                            OPTION_ICONS.map((ICO, index) => (
                                <div key={index} className='p-1 hover:cursor-pointer hover:bg-slate-200 rounded-full'>
                                    <ICO className='text-xl text-blue-400 m-2' />
                                </div>
                            ))
                        } */}
                    </div>
                    <button onClick={handleCreatePost} className='bg-blue-400 hover:bg-blue-600 rounded-full p-1 text-lg 
                    text-white w-20 transition duration-200'>
                        Post
                    </button>
                </div>

                <progress value={uploadProgress} max="100" />
            </div>
        </div>
    )
}

export default CreatePost