'use client'

import { Button, Label, TextInput } from 'flowbite-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { FormEventHandler, ReactElement } from 'react'

import { GoogleButton } from './GoogleButton'

function LoginForm(): ReactElement {
  const router = useRouter()

  const handleLogIn: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const res = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    })

    if (res && !res.error) {
      router.push('/map')
    } else {
      console.log(res)
    }
  }
  return (
    <form className='flex justify-center flex-col' onSubmitCapture={handleLogIn}>
      <div className='mt-4 justify-center w-full'>
        <h1 className='text-center'>Käyttäjätunnus</h1>
        <TextInput color="dark" placeholder='Käyttäjätunnus' className='mt-1 text-dark' type="username" name="username" autoComplete='new-username' required />
      </div>
      <div className='mt-4 mb-4 justify-center w-full'>
        <h1 className='text-center'>Salasana</h1>
        <TextInput color="dark" placeholder='Salasana' className='mt-1 text-dark' type="password" name="password" autoComplete='new-password' required />
      </div>
      <Button type="submit" className="w-full mb-1 mt-4 bg-primary">
        Kirjaudu
      </Button>

      <GoogleButton />
    </form>
  )
}

export { LoginForm }
