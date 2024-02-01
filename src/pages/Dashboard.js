import React, {useState, useEffect} from 'react'
import {auth,database} from '../services/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import axios from 'axios'
import Song from '../components/Song'


const Dashboard = () => {

  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("")
  const [playlist, setPlaylist] = useState([])
  const [myPlaylist, setMyPlaylist] = useState([])





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


      const playlistRef = collection(database, "playlist");
      const q2 = query(playlistRef, where("uid", "==", auth.currentUser.uid));
      const querySnapShot2 = await getDocs(q2);
      const arr2 = querySnapShot2.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setMyPlaylist(arr2)

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadMyData()
  },[])


  const searchPlaylist = async() => {
    setIsLoading(true)
    if(search !== ""){
      await axios.get(`https://itunes.apple.com/search?term=${search}`)
      .then(res => {
        setPlaylist(res.data.results)
        setIsLoading(false)
      })
      .catch(err => {
        toast.error(err.message)
        setIsLoading(false)
      })
    } else {
      toast.error("Please select your artist / band")
      setIsLoading(false)
    }
  }

  const saveToPlaylist = async(track) => {
    const mytrack = {
      ...track,
      uid: auth.currentUser.uid,
      createdAt: Date.now()
    }
    await addDoc(collection(database, "playlist"), mytrack)
    .then(res => {
      loadMyData()
      toast.success("Track Added")
    })
    .catch(err => {
      toast.error(err.message)
    })
  }

  const removeFromPlaylist = async(id) => {
    await deleteDoc(doc(database, "playlist", id))
    .then(res => {
      toast.success("Track removed")
      loadMyData()
    })
    .catch(err => {
      toast.error(err.message)
    })
  }


  return (
    <div className='container'>
      <ToastContainer />
      <div className='row' style={{paddingTop:30}}>

        <div className='col-lg-3'>
          {auth.currentUser.email}<br/>
          {auth.currentUser.uid}
          <button onClick={logoutAction} className='btn btn-outline-danger'>Logout</button>
        </div>

        <div className='col-lg-9'>

          <div className='row'>
            <div className='col-lg-10'>
              <input
                placeholder='Type artist / band name...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type='text'
                className='form-control'
              />
            </div>
            <div className='col-lg-2'>
              <button onClick={searchPlaylist} className='btn btn-success'>Search</button>
            </div>
          </div>

          <div className='row' style={{marginTop:30}}>
            <dic className='col-lg-12'>

              {
                isLoading ? (<>
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                </>) : (<>
                  {
                    playlist.length > 0 && (<>
                      {
                        playlist.map(item => 
                          <Song 
                            myPlaylist={myPlaylist}
                            removeFromPlaylist={removeFromPlaylist}
                            saveToPlaylist={saveToPlaylist}
                            key={item.trackId} 
                            item={item} />)
                      }
                    </>)
                  }
                </>)
              }

            </dic>
          </div>

        </div>
      </div>
        
    </div>

  )
}

export default Dashboard