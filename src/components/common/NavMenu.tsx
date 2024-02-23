import { Compass, Github, Home } from 'lucide-react'

import { AppConfig, NavMenuVariant } from '@components/lib/AppConfig'

import NavMenuItem from './NavMenuItem'
import AuthButton from './AuthButton'

interface NavMenuProps {
  variant?: NavMenuVariant
}

const NavMenu = ({ variant = NavMenuVariant.INTRO }: NavMenuProps) => {
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
      <NavMenuItem label="Teatteri" icon={<Compass size={navIconSize} />} />
      <AuthButton />
    </ul>
  )
}

export default NavMenu
