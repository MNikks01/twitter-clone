import React, { useState } from 'react'

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, dB } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

function LoginRegisterPage() {

    const navigate = useNavigate()

    const [userName, setuserName] = useState("")
    const [handleId, sethandleId] = useState("")
    const [registerEmailId, setregisterEmailId] = useState("")
    const [registerPassword, setregisterPassword] = useState("")
    const handleCreateAccount = (e) => {
        e.preventDefault();
        if (registerEmailId && registerPassword && userName && handleId) {
            createUserWithEmailAndPassword(auth, registerEmailId, registerPassword)
                .then((userCredential) => {
                    const user = userCredential.user

                    setDoc(doc(dB, "USERS", user.uid), {
                        USER_NAME: userName,
                        USER_HANDLE_ID: handleId,
                        USER_EMAIL: registerEmailId,
                        USER_PASSWORD: registerPassword,
                        USER_CREATED_ON: serverTimestamp()
                    }).then(() => {
                        setuserName("")
                        sethandleId("")
                        setregisterEmailId("")
                        setregisterPassword("")

                        navigate('/home')
                    }).catch((error) => {
                        console.log(error);
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    const [loginEmailId, setloginEmailId] = useState("")
    const [loginPassword, setloginPassword] = useState("")
    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, loginEmailId, loginPassword)
            .then(() => {
                checkUserState()
            })
            .catch((err) => console.log(err.message))
    }

    // const navigate = useNavigate()

    const checkUserState = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/home')
            }
        });
    }

    return (
        <div className='flex flex-row items-center justify-center'>

            {/* login code from tailwind css */}
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input value={loginEmailId} onChange={(e) => setloginEmailId(e.target.value)} id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

                            </div>
                            <div className="mt-2">
                                <input value={loginPassword} onChange={(e) => setloginPassword(e.target.value)} id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button onClick={handleLogin} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>


                </div>
            </div>


            {/* registration code from tailwind css */}
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
                            <div className="mt-2">
                                <input value={userName} onChange={(e) => { setuserName(e.target.value) }} id="email" name="email" type="text" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Handle Id</label>
                            <div className="mt-2">
                                <input value={handleId} onChange={(e) => { sethandleId(e.target.value) }} id="email" name="email" type="text" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>



                        <div>
                            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input value={registerEmailId} onChange={(e) => { setregisterEmailId(e.target.value) }} id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

                            </div>
                            <div className="mt-2">
                                <input value={registerPassword} onChange={(e) => { setregisterPassword(e.target.value) }} id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button onClick={handleCreateAccount} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
                        </div>
                    </form>


                </div>
            </div>

        </div>
    )
}

export default LoginRegisterPage