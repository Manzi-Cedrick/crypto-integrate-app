import Image from 'next/image'
import React from 'react'

const Logo = ({size} : {
    size?: number
}) => {
    return (
        <div className='flex flex-row w-full items-center gap-4'>
            <Image src="/assets/logo.png" alt="CoinTest"
                width={
                    size || 50
                }
                height={
                    size || 50
                }/>
            <span className='font-extrabold text-primary text-lg md:text-2xl'>CoinTest</span>
        </div>
    )
}

export default Logo