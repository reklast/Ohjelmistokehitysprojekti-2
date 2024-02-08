"use client"
import { LucideProps } from 'lucide-react'
import Link, { LinkProps } from 'next/link'
import { useRouter, usePathname } from 'next/navigation' // Import useRouter and usePathname
import placesFetch from '@src/helpers/placesFetch'

type LinkAnchorIntersection = LinkProps & HTMLAnchorElement

interface NavMenuItemProps {
  href: LinkAnchorIntersection['href']
  external?: boolean
  label: string
  icon: LucideProps
}

const NavMenuItem = ({ icon, href, external = false, label }: NavMenuItemProps) => {
  const router = useRouter()

  const handleClick = async () => {
    try {
      await fetchPlaces(label);
      
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }

  return (
    <li onClick={handleClick} className={`${usePathname() === (href || '/') ? 'underline underline-offset-1' : ''}`}>
      <Link href={href} target={external ? '_blank' : '_self'} className="flex items-center gap-2">
        <>
          {icon} {label}
        </>
      </Link>
    </li>
  )
}

export default NavMenuItem;

function fetchPlaces(label: string) {
  throw new Error('Function not implemented.')
}

