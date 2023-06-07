"use client"
import {useState, useEffect} from 'react'
import {signIn, signOut, getProviders, useSession} from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'

const Nav = () => {

    const {data: session} = useSession();
    const [providers, setproviders] = useState(null);
    const [toggleDropdown, settoggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setproviders(response)
        }
        setUpProviders();
    },[])

  return (
    <nav className=' flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
            <Image src='/assets/images/logo.svg' 
            alt='Promptia logo' 
            width={30} 
            height={30} 
            className='object-contain'
            />
            <p className='logo_text'>Promptia</p>
        </Link>

        {/* desktop responsive navigation */}
        <div className='sm:flex hidden'>    
            {session?.user 
            ?( <div className='flex gap-3 md:gap-5'>
                <Link href='/create' className='black_btn'>Create Post</Link>
                <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
                <Link href='/profile'>
                    <Image src={session?.user.image}
                    alt='Profile'
                    width={37}
                    height={37}
                    className='rounded-full'
                    />
                </Link>
            </div> )
            :(<>
            {/* sign in logic */}
                {providers && Object.values(providers).map((provider) => (
                    <button 
                    type='button' 
                    key={provider.name} 
                    onClick={() => signIn(provider.id)} 
                    className='black_btn'>
                        Sign In
                    </button>
                ))}
            </>)}
        </div>

        {/* mobile responsive navigation */}
        <div className='sm:hidden flex relative'>
            {session?.user 
            ?(
                <div className='flex'>
                    <Image src={session?.user.image}
                        alt='Profile'
                        width={37}
                        height={37}
                        className='rounded-full'
                        onClick={() => settoggleDropdown((prev) => !prev)}  // prev working as switch
                    />

                    {toggleDropdown && (
                        <dir className='dropdown'>
                            <Link 
                            href='profile'
                            className='dropdown_link'
                            onClick={() => settoggleDropdown(false)}
                            > My Profile </Link>

                            <Link 
                            href='/create'
                            className='dropdown_link'
                            onClick={() => settoggleDropdown(false)}
                            > Create Prompt </Link>

                            <button type='button' 
                            onClick={() => {
                                settoggleDropdown(false);
                                signOut();
                            }}
                            className='mt-5 w-full black_btn'
                            >
                                Sign Out
                            </button>
                        </dir>
                    )}
                </div>
            )
        :(
            <>
            {/* sign in logic */}
                {providers && Object.values(providers).map((provider) => (
                    <button 
                    type='button' 
                    key={provider.name} 
                    onClick={() => signIn(provider.id)} 
                    className='black_btn'>
                    SignIn
                    </button>
                ))}
            </>
        )}
        </div>
    </nav>
  )
}

export default Nav