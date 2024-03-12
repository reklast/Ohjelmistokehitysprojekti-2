'use client'
import { Compass, Github, Home } from 'lucide-react'
import { useState } from 'react';
import { AppConfig, NavMenuVariant } from '@components/lib/AppConfig'

import NavMenuItem from './NavMenuItem'
import AuthButton from './AuthButton'
import EventsButton from '@components/common/EventsButton'
import Weather from '@components/common/Weather'
import EventAPI from '@components/common/EventAPI'

interface NavMenuProps {
  variant?: NavMenuVariant
  
}

const NavMenu = ({ variant = NavMenuVariant.INTRO,  }: NavMenuProps) => {
  const [display, setDisplay] = useState(false);
  const navIconSize =
    variant === NavMenuVariant.TOPNAV ? AppConfig.ui.topBarIconSize : AppConfig.ui.menuIconSize

  const listStyle =
    variant === NavMenuVariant.TOPNAV
      ? `flex text-white gap-4 text-lg text-white text-sm md:text-base`
      : `flex flex-col justify-between gap-2 w-fit text-primary`

  return (
    <>
    <ul className={`${listStyle}`}>
      
      <NavMenuItem label="Museo" icon={<Compass size={navIconSize} />} />
      <NavMenuItem label="Muistomerkki" icon={<Compass size={navIconSize} />} />
      <NavMenuItem label="Teatteri" icon={<Compass size={navIconSize} />} />
      <EventsButton display={display} setDisplay={setDisplay}/>
      <EventAPI display={display}/>
      <AuthButton />
      <Weather/>
    </ul>
    </>
  )
}

export default NavMenu
