import { Compass, Github, Home } from 'lucide-react';
import { useState } from 'react';
import { AppConfig, NavMenuVariant } from '@components/lib/AppConfig';

import NavMenuItem from './NavMenuItem';
import EventsAPI from './EventAPI';
import EventsButton from '@components/common/EventsButton';

interface NavMenuProps {
  variant?: NavMenuVariant;
  display: boolean; // Add display prop to the interface
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavMenu = ({ variant = NavMenuVariant.INTRO, display, setDisplay }: NavMenuProps) => {  
  const navIconSize =
    variant === NavMenuVariant.TOPNAV ? AppConfig.ui.topBarIconSize : AppConfig.ui.menuIconSize;

  const listStyle =
    variant === NavMenuVariant.TOPNAV
      ? `flex text-white gap-4 text-lg text-white text-sm md:text-base`
      : `flex flex-col justify-between gap-1 w-fit text-primary`;

  return (
    <ul className={`${listStyle}`}>
      <NavMenuItem href="/" label="Museo" icon={<Home size={navIconSize} />} />
      <NavMenuItem href="/map" label="Muistomerkit" icon={<Compass size={navIconSize} />} />
      <EventsButton display={display} setDisplay={setDisplay} />
    </ul>
  );
};

export default NavMenu;
