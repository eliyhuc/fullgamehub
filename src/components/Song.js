import React from 'react'
import { IoHeart,IoHeartOutline } from "react-icons/io5";

const Song = (props) => {

  const trackLength = (props.item.trackTimeMillis / 1000) / 60 ;


  const result = props.myPlaylist.filter(x => x.trackId === props.item.trackId);


  return (
    <div className='row rowitem'>
        <div className='col-lg-2'>
            <img src={props.item.artworkUrl100} />
        </div>
        <div className='col-lg-8'>
            <h1 className='song-title'>{props.item.trackName}</h1>
            <p><b>{props.item.artistName}</b> | <b>Kind: </b> {props.item.kind}</p>
            <p><b>Length:</b> {trackLength.toFixed(2)} | <b>Price: </b> ${props.item.trackPrice}</p>
        </div>
        <div className='col-lg-2'>
            {
                result.length > 0 
                ? (<IoHeart onClick={() => {props.removeFromPlaylist(result[0].id)}} size={60} color='#e10000' />)
                : (<IoHeartOutline onClick={() => {props.saveToPlaylist(props.item)}} size={60} color='#e10000' />) 
            }
            
        </div>
    </div>
  )
}

export default Song