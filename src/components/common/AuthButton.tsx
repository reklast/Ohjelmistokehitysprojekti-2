'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function AuthButton() {
  return (
    <div className="flex items-center">
      {useSession()?.data ? (
        <Link href="#" onClick={() => signOut({ callbackUrl: '/map' })}>
          <img src="/logout.svg" className="w-6" />
        </Link>
      ) : (
        <Link href="/api/auth/login">Kirjaudu sisään</Link>
      )}
    </div>
  )
}

export default AuthButton
