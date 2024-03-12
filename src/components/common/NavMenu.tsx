'use client'

import { Dropdown } from 'flowbite-react'
import { Compass } from 'lucide-react'
import { useState } from 'react'

import EventAPI from '@components/common/EventAPI'
import EventsButton from '@components/common/EventsButton'
import Weather from '@components/common/Weather'
import { AppConfig, NavMenuVariant } from '@components/lib/AppConfig'

import AuthButton from './AuthButton'
import NavMenuItem from './NavMenuItem'

interface NavMenuProps {
  variant?: NavMenuVariant
}

const NavMenu = ({ variant = NavMenuVariant.INTRO }: NavMenuProps) => {
  const [display, setDisplay] = useState(false)
  const navIconSize =
    variant === NavMenuVariant.TOPNAV ? AppConfig.ui.topBarIconSize : AppConfig.ui.menuIconSize

  const listStyle =
    variant === NavMenuVariant.TOPNAV
      ? `flex text-white justify-between text-lg text-white text-sm md:text-base`
      : `flex flex-col justify-between gap-1 w-fit text-primary`

  return (
    <>
      <ul className={`${listStyle}`}>
        <div className="flex items-center gap-1 sm:gap-8 w-full justify-start">
          <EventsButton display={display} setDisplay={setDisplay} />
          <Dropdown className="p-0 text-base" label="categories">
            <Dropdown.Item>
              <NavMenuItem label="Museo" icon={<Compass size={navIconSize} />} />
            </Dropdown.Item>
            <Dropdown.Item>
              <NavMenuItem label="Muistomerkki" icon={<Compass size={navIconSize} />} />
            </Dropdown.Item>
            <Dropdown.Item>
              <NavMenuItem label="Teatteri" icon={<Compass size={navIconSize} />} />
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className='flex items-center w-full justify-end gap-2 sm:gap-8'>
          <EventAPI display={display} />
          <Weather />
          <AuthButton />
        </div>
      </ul>
    </>
  )
}

export default NavMenu
