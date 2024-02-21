'use client'

import useMapContext from '@components/Map/useMapContext'
import { LucideProps } from 'lucide-react'

interface NavMenuItemProps {
  external?: boolean
  label: string
  icon: LucideProps
}

const NavMenuItem = ({ icon, label }: NavMenuItemProps) => {
  const { setCategory } = useMapContext();

  const onButtonClick = () => {
    setCategory!(label);
  } 

  return (
    <li className="underline underline-offset-1">
      <button onClick={onButtonClick} className="flex items-center gap-2">
        <>
          {icon} {label}
        </>
      </button>
    </li>
  )
}

export default NavMenuItem