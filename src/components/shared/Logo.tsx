import Image from 'next/image'
import React from 'react'

const Logo = ({size} : {
    size?: number
}) => {
    return (
        <div className='flex w-full flex-row items-center gap-4'>
            <Image src="/assets/logo.png" alt="Myvtial"
                width={
                    size || 50
                }
                height={
                    size || 50
                }/>
            <span className='font-extrabold text-primary text-2xl'>CoinTest</span>
        </div>
    )
}

export default Logo