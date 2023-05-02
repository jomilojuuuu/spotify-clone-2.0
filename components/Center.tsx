import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from "lodash";
import Songs from './Songs';

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-purple-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-purple-500",
];

function Center() {
    const { data: session } = useSession();
    const [color,setColor] = useState(null);

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [])
  return (
    <div className='flex-grow '>
        <header className='absolute top-5 right-8'>
            <div className='flex items-center
             bg-red-500 space-x-3 opacity-90 hover:opacity-80 cursor-pointer 
             rounded-full p-1 pr-2'>
                <img 
                className='rounded-full w-10 h-10' 
                src={session?.user.image} 
                alt="profile pic" 
                />
                <h2>{session?.user.name}</h2>
                <ChevronDownIcon className='h-5 w-5'/>
            </div>
        </header>

        <section 
        className={`flex items-end space-x-7 bg-gradient-to-b
         to-black ${color} h-80 text-white padding-8 `}>

            {/* <img 
            className='h-44 w-44 shadow-2xl' 
            src={playlist?.images?.[0]?.url} 
            alt="playlist img" 
            />
             */}
            <div>
                {/* <p>PLAYLIST</p>
                <h1 className='text-2xl md:text-3xl xl:text-5xl'>{playlist?.name}</h1> */}
            </div>
        </section>

        <div>
            <Songs />
        </div>
    </div>
  )
}

export default Center