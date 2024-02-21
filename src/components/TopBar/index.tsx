import LatLngLogo from '@components/TopBar/LatLngLogo'

import { NavMenuVariant } from '@components/lib/AppConfig'

import NavMenu from '../common/NavMenu'
import EventsAPI from '@components/common/EventAPI'
import { useState } from 'react'

const MapTopBar = () => {
const [display, setDisplay] = useState (false)
const eventStyle = {
  position: 'fixed',
  top: '80px',
  left: '300px',
  width: '50%',
  padding: '10px',
  color: 'white',
};

  return(
    <>
  <div
    className="h-20 absolute w-full left-0 top-0 p-3 shadow bg-dark flex items-center"
    style={{ zIndex: 1000 }}
  >
    <div className="flex justify-between w-full">
      
      <div className="flex flex-col justify-center">
        
      <NavMenu variant={NavMenuVariant.TOPNAV} display={display} setDisplay={setDisplay} />

       
      </div>
    </div> <div  style={eventStyle}><EventsAPI display={display}/></div>
  </div></>
  )
}

export default MapTopBar
