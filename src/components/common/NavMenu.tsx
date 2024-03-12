'use client'

import { Dropdown } from 'flowbite-react'
import { Compass } from 'lucide-react'
import { useEffect, useState } from 'react'

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
  const [isMobile, setIsMobile] = useState(false);
  const navIconSize =
    variant === NavMenuVariant.TOPNAV ? AppConfig.ui.topBarIconSize : AppConfig.ui.menuIconSize

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 660);
      };
  
      window.addEventListener('resize', handleResize);
      // Initial check in case the initial window size is less than 600px
      handleResize();
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  const listStyle =
    variant === NavMenuVariant.TOPNAV
      ? `flex text-white justify-between text-lg text-white md:text-base`
      : `flex flex-col justify-between gap-1 w-fit text-primary`


  return (
    <>
      <ul className={`${listStyle}`}>
        <div className="flex items-center gap-4 lg:gap-10 w-full justify-start px-5">
          <Dropdown label="Categories" size="xl">
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
          <EventsButton display={display} setDisplay={setDisplay} />
        </div>
        <div className='flex items-center w-full justify-end gap-2 sm:gap-8 px-5'>
          <EventAPI display={display} />
          {!isMobile && (<Weather />)}
          <AuthButton />
        </div>
      </ul>
    </>
  )
}

export default NavMenu
