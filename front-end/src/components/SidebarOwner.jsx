import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { FaHome, FaSignOutAlt } from 'react-icons/fa'
import logo from '../assets/logo.png'

import cookies from '../config/cookie'

export default function SidebarOwner() {
    // Required State
    const [collapseShow, setCollapseShow] = useState('hidden')

    // Get Full Year for copyright
    const year = new Date().getFullYear()

    // Get Data from Cookies
    const cookie = cookies.getDecodedCookie()

    // Active ClassName for Navigation
    const activeClass = 'text-gray-900 hover:text-gray-500 text-xs uppercase py-3 font-bold flex'
    const inActiveClass = 'text-gray-500 hover:text-gray-400 text-xs uppercase py-3 font-bold flex'

    const activeClassses = (path) => window.location.pathname === path ? activeClass : inActiveClass

    // Access Navigation for Owner
    const primaryLinks = [
        { path: '/owner/dashboard', name: 'Dashboard Pemilik', icon: <FaHome className='mr-2 text-lg' /> },
    ]

    // Block Access if Login Role is not Owner
    if (cookie.admin.role !== 'owner') {
        alert('Anda tidak memiliki akses ke halaman ini')
        window.location.href = '/login'
    }

    // logout function
    const logout = () => {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        window.location.href = '/'
    }

    return (
        <>
            <nav className='md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6'>
                <div className='md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto'>
                    <NavLink className='md:block text-left md:pb-2 text-black mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0' to='/admin/dashboard'>
                        Halo, {cookie.admin.name}
                    </NavLink>

                    <button className='cursor-pointer text-gray-700 focus:text-gray-600 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent' type='button' onClick={() => setCollapseShow('bg-slate-800 m-2 py-3 px-6')}>
                        <svg
                            className='block h-6 w-6'
                            stroke='currentColor'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 6h16M4 12h16M4 18h16'
                            />
                        </svg>
                    </button>


                    {/* Collapse */}
                    <div className={'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' + collapseShow}>

                        {/* Collapse header */}
                        <div className='md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200'>
                            <div className='flex flex-wrap'>
                                <div className='w-6/12'>
                                    <NavLink className='md:block text-left text-white md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm font-bold p-4 px-0' to='/cashier/dashboard'>
                                        <h1 className='text-white font-bold text-xl'><span className='text-sky-500'>Kuy</span>Laundry</h1>
                                    </NavLink>
                                </div>
                                <div className='w-6/12 flex justify-end'>
                                    <button type='button' className='cursor-pointer text-white md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent' onClick={() => setCollapseShow('hidden')}>
                                        <AiOutlineClose />
                                    </button>
                                </div>
                            </div>
                        </div>


                        {/* Navigation */}
                        <h6 className='md:min-w-full text-gray-600 text-xs uppercase font-bold block mb-1'>
                            Navigasi
                        </h6>

                        <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
                            {primaryLinks.map((link, index) => (
                                <li key={index} className='items-center'>
                                    <NavLink className={activeClassses(link.path)} to={link.path}>
                                        {link.icon}
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <hr className='my-4 md:min-w-full' />

                        {/* Navigation */}
                        <h6 className='md:min-w-full text-gray-600 text-xs uppercase font-bold block mb-1'>
                            Pengaturan
                        </h6>

                        <ul className='md:flex-col md:min-w-full flex flex-col list-none md:mb-4'>
                            <li className='items-center'>
                                <button className={inActiveClass} onClick={logout}>
                                    <FaSignOutAlt className='mr-2 text-lg' />Keluar
                                </button>
                            </li>
                        </ul>
                    </div>
                    <small className='text-[#B6B6B6] hidden md:flex'>&copy; {year} Drew House</small>
                </div>
            </nav>
            <div className='bg-white hidden md:flex self-end justify-end items-center p-4 sticky top-0 cursor-default'>
                <div className='flex justify-center items-center mx-auto'>
                    <img src={logo}
                        className=' w-36 h-7 object-center '
                    />
                </div>
            </div>
        </>
    )
}
