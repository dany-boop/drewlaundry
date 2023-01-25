import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'


export default function Footer() {
    const year = new Date().getFullYear()

    const navLink = [
        { path: '/', name: 'Beranda' },
        { path: '/developers', name: 'Developer' },
        { path: '/login', name: 'Login' },
    ]

    const socialLink = [
        { href: 'https://instagram.com/_.daannnnyy', name: 'Instagram' },
        { href: 'https://github.com/dany-boop', name: 'GitHub' },
    ]

    const contactLink = [
        { href: 'mailto:dny77853@gmail.com', name: 'Email' },
    ]

    return (
        <footer className='bg-white pt-20 pb-3 px-5 max-w-7xl mx-auto'>
            <div className='container'>
                <div className='flex flex-wrap'>
                    {/* Logo */}
                    <div className='flex justify-center items-center mx-auto'>
                        <img src={logo}
                            className=' w-36 h-7 object-center '
                        />
                    </div>
                    {/* Logo End */}

                    {/* Navigation */}
                    <div className='w-full px-20 mb-12 md:w-1/5'>
                        <h2 className='font-semibold text-xl text-black mb-5'>
                            Navigation
                        </h2>
                        <ul>
                            {navLink.map((link, index) => (
                                <li key={index}>
                                    <NavLink className='inline-block text-base text-slate-400 hover:text-zinc-200' to={link.path}>{link.name}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Navigation End */}

                    {/* Social Media */}
                    <div className='w-full px-20 mb-12 md:w-1/5'>
                        <h2 className='font-semibold text-xl text-black mb-5'>
                            Social
                        </h2>
                        <ul>
                            {socialLink.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} target='_blank' className='inline-block text-base text-slate-400 hover:text-zinc-200'>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Social Media End */}

                    {/* Contact */}
                    <div className='w-full px-20 mb-12 md:w-1/5'>
                        <h2 className='font-semibold text-xl text-black mb-5'>
                            contact
                        </h2>
                        <ul>
                            {contactLink.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} target='_blank' className='inline-block text-base text-slate-400 hover:text-zinc-200'>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Contact End */}
                </div>
                <div className='w-full pt-5 text-sm'>
                    <div className='block text-center md:flex md:flex-wrap justify-between'>
                        <div className='px-4'>
                            <a href='mailto:naufalakbar378@gmail.com' className='text-[#B6B6B6] hover:text-[#989797]'>Report</a>
                            <a href='#' className='text-[#B6B6B6] hover:text-[#989797] ml-3'>Terms of Privacy</a>
                            <a href='#' className='text-[#B6B6B6] hover:text-[#989797] ml-3'>Terms and Use</a>
                        </div>
                        <div className='px-4 pt-2 md:pt-0'>
                            <span className='text-[#B6B6B6]'>&copy; {year} DrewHouse</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    )
}