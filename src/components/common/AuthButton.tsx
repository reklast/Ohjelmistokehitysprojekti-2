'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function AuthButton() {
  return (
    <>
      {useSession()?.data ? (
        <Link href="#" onClick={() => signOut({ callbackUrl: '/' })}>
          Sign Out
        </Link>
      ) : (
        <Link href="/api/auth/login">Sign In</Link>
      )}
    </>
  )
}

export default AuthButton
