import { Compass, Github, Home } from 'lucide-react'
import { useState } from 'react'

import EventsButton from '@components/common/EventsButton'
import { AppConfig, NavMenuVariant } from '@components/lib/AppConfig'

import EventsAPI from './EventAPI'
import NavMenuItem from './NavMenuItem'

interface NavMenuProps {
  variant?: NavMenuVariant
  display: boolean // Add display prop to the interface
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>
}

const NavMenu = ({ variant = NavMenuVariant.INTRO, display, setDisplay }: NavMenuProps) => {
  const navIconSize =
    variant === NavMenuVariant.TOPNAV ? AppConfig.ui.topBarIconSize : AppConfig.ui.menuIconSize

  const listStyle =
    variant === NavMenuVariant.TOPNAV
      ? `flex text-white gap-4 text-lg text-white text-sm md:text-base`
      : `flex flex-col justify-between gap-1 w-fit text-primary`

  return (
    <ul className={`${listStyle}`}>
      <NavMenuItem label="Museo" icon={<Compass size={navIconSize} />} />
      <NavMenuItem label="Muistomerkki" icon={<Compass size={navIconSize} />} />
      <NavMenuItem label="Teatteri" icon={<Compass size={navIconSize} />} />{' '}
      <EventsButton display={display} setDisplay={setDisplay} />
    </ul>
  )
}

export default NavMenu
