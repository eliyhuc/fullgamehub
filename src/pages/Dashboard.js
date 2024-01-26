import React, {useState, useEffect} from 'react'
import {auth,database} from '../services/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'


const Dashboard = () => {

  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  const logoutAction = async() => {
    auth.signOut()
    navigate("/")
  }

  const loadMyData = async() => {
    try {
      const accountsRef = collection(database, "accounts");
      const q = query(accountsRef, where("accountUid", "==", auth.currentUser.uid));
      const querySnapShot = await getDocs(q);
      const arr = querySnapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setAccount(arr[0])
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadMyData()
  },[])



  console.log(account);



  return (
    <div className='container'>
      <ToastContainer />
      <div className='row'>

        <div className='col-lg-3'>
          {auth.currentUser.email}<br/>
          {auth.currentUser.uid}
          <button onClick={logoutAction} className='btn btn-outline-danger'>Logout</button>
        </div>

        <div className='col-lg-9'>

        </div>
      </div>
        
    </div>

  )
}

export default Dashboard