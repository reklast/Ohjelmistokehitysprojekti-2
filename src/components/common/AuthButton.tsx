'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function AuthButton() {
  return (
    <>
      {useSession()?.data ? (
        <Link href="#" onClick={() => signOut({ callbackUrl: '/map' })}>
          Kirjaudu ulos
        </Link>
      ) : (
        <Link href="/api/auth/login">Kirjaudu sisään</Link>
      )}
    </>
  )
}

export default AuthButton
