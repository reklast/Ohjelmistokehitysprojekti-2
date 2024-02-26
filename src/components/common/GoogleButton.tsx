'use client'
import { Button } from "flowbite-react"
import { signIn } from "next-auth/react"

const GoogleButton = () => {

    const callbackUrl = "/map";

    return (
        <Button onClick={() => signIn('google', {callbackUrl})} className="flex items-center mt-1 bg-white text-dark w-full">
            <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="google-svg" className="pr-2 w-6"/>
            Log in with Google
        </Button>
    )
}

export {GoogleButton};
