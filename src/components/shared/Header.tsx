"use client";
import React, {useEffect} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import { MenuSideBarIcon } from '../icons';
import { headerRoutes } from '@/utils/types';
import Logo from './Logo';

const Header = () => {
    const [showMenu, setShowMenu] = React.useState(false);
    const navigate = useRouter();
    const pathName = usePathname()
    const changeHeader = (path: string) => {  
        return path === pathName ? 'text-primary' : 'text-tertiary'
    }
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && showMenu) {
                setShowMenu(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [showMenu]);
    return (
        <div
            className='flex md:flex-row flex-col md:justify-between justify-around z-20 items-center border-b-2 border-gray-100 py-2 px-0 sm:px-14 lg:px-16 xl:px-20'>
            <div className='flex flex-row w-full justify-between items-center px-4 md:px-0'>
                <Logo/>
                <div className='flex justify-end md:hidden'>
                    <button onClick={
                        () => setShowMenu(!showMenu)
                    }
                            className='focus:outline-none z-20 hover:cursor-pointer'>
                        {showMenu ? (
                            <span className='text-2xl'>&times;</span>
                        ) : <MenuSideBarIcon/>}
                    </button>

                </div>
            </div>
            <ul className={`${showMenu ? 'flex' : 'hidden md:flex'} z-20 md:flex-row py-10 md:py-0 flex-col items-center w-full justify-end  mx-auto gap-6`}>
                {
                    headerRoutes.map((path, index) => (
                        <Link key={index}
                              href={
                                  path.href
                              }>
                            <li className={
                                `font-normal text-md z-20 ${
                                    changeHeader(path.href)
                                } hover:text-primary`
                            }>
                                {
                                    path.name
                                }</li>
                        </Link>
                    ))
                }
            </ul>
                <div
                    className={`${showMenu ? 'flex' : 'hidden md:flex'} md:flex-row gap-4 w-full items-center justify-end z-20 mb-10 md:mb-0 text-base flex-col`}>
                    <button onClick={() => navigate.push('/')}
                            className='text-white  bg-primary flex items-center flex-row py-3 px-8 rounded-full active:bg-primary'>Get Started
                    </button>
                </div>
        </div>
    )
}

export default Header
