import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { auth, database } from '../services/firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'

const Authentication = () => {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginView, setIsLoginView] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const loginAction = async () => {
        setIsLoading(true)
        if (email !== "" && password !== "") {
            try {
                await signInWithEmailAndPassword(auth, email, password)
                    .then(async (user) => {
                        setIsLoading(false)
                        console.log(user);
                        navigate('/dashboard')
                    })
            } catch (error) {
                setIsLoading(false)
                toast.error(error.message)
            }
        } else {
            setIsLoading(false)
            toast.error("All inputs required")
        }
    }


    const signupAction = async () => {
        setIsLoading(true)
        if (email !== "" && password !== "" && firstName !== "" && lastName !== "") {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                    .then(async (user) => {

                        await addDoc(collection(database, "accounts"),{
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            accountUid: user.user.uid,
                            address: address,
                            mobile: mobile,
                            city: city,
                            avatar: 'https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg',
                            isUserLock: false
                        })
                        .then(account_created => {
                            console.log(account_created);
                            setIsLoading(false)
                            navigate('/dashboard')
                        })
                    })
            } catch (error) {
                toast.error(error.message)
                setIsLoading(false)
            }
        } else {
            toast.error("All inputs required")
            setIsLoading(false)
        }
    }

    return (

        <div style={{ marginTop: 50 }}>
            <ToastContainer />


            {
                isLoginView ? (<>
                    <h1 className='title'>Login</h1>

                    <label className="form-label">Email address</label>
                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="email"
                        className="form-control" />

                    <label className="form-label">Password</label>
                    <input
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        type="password"
                        className="form-control" />

                    {
                        isLoading ? (<>
                        <div class="spinner-border text-light" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        </>) : (<button onClick={loginAction} className='btn btn-success'>Login</button>)
                    }
                    
                </>) : (<>






                    <h1 className='title'>Create New Account</h1>

                    <label className="form-label">First name <span style={{color:'#880000'}}>*</span></label>
                    <input
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value) }}
                        type="email"
                        className="form-control" />

                    <label className="form-label">Last name <span style={{color:'#880000'}}>*</span></label>
                    <input
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }}
                        type="email"
                        className="form-control" />

                    <label className="form-label">Mobile</label>
                    <input
                        value={mobile}
                        onChange={(e) => { setMobile(e.target.value) }}
                        type="email"
                        className="form-control" />

                    <label className="form-label">Address</label>
                    <input
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                        type="email"
                        className="form-control" />

                    <label className="form-label">City</label>
                    <input
                        value={city}
                        onChange={(e) => { setCity(e.target.value) }}
                        type="email"
                        className="form-control" />

                    <label className="form-label">Email address <span style={{color:'#880000'}}>*</span></label>
                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="email"
                        className="form-control" />

                    <label className="form-label">Password <span style={{color:'#880000'}}>*</span></label>
                    <input
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        type="password"
                        className="form-control" />

{
                        isLoading ? (<>
                        <div class="spinner-border text-light" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        </>) : (<button onClick={signupAction} className='btn btn-warning'>Sign Up</button>)
                    }
                    
                </>)
            }

            <button onClick={() => setIsLoginView(!isLoginView)} className='btn btn-outline-light'>
                {isLoginView ? "Go to signup" : "Go to login"}
            </button>


            {auth?.currentUser?.uid}

















        </div>

    )
}

export default Authentication