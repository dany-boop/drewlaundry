import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import axios from '../config/axios'
import cookie from '../config/cookie'
import bg from '../assets/background.png'
import logo from '../assets/logo.png'

export default function Login() {
    const [isLoginError, setIsLoginError] = useState(false)
    const [isLoginSuccess, setIsLoginSuccess] = useState(false)

    const onSubmit = async (data) => {
        const body = {
            email: data.email,
            password: data.password
        }

        try {
            const response = await axios.post('/admin/login', body)

            if (response.data.message === 'Invalid credentials') {
                throw new Error(res.data.message)
            } else if (response.data) {
                cookie.createCookie(response.data.token)

                if (response.data.user.role === 'admin') {
                    setIsLoginSuccess(true)
                    setTimeout(() => window.location.href = '/admin/dashboard', 1500)
                } else if (response.data.user.role === 'cashier') {
                    setIsLoginSuccess(true)
                    setTimeout(() => window.location.href = '/cashier/dashboard', 1500)
                } else if (response.data.user.role === 'owner') {
                    setIsLoginSuccess(true)
                    setTimeout(() => window.location.href = '/owner/dashboard', 1500)
                }
            }
        } catch (error) { setIsLoginError(true) }
    }

    const { handleSubmit, register } = useForm()

    return (
        <div>
            <div className="relative">
                <img
                    src={bg}
                    className="absolute inset-0 object-cover object-center"
                    alt="bg-private"
                />
                <section class="relative">
                    <div className='container px-4 py-5 mx-auto'>
                        <div className='px-5 py-14 mx-auto'>
                            <div className='flex justify-center items-center mx-auto'>
                                <img src={logo}
                                    className=' w-72 h-14 object-center '
                                />
                            </div>
                        </div>
                        <div className='text-center pt-28'>
                            <h2 className='sm:text-3xl text-xl font-serif text-center title-font text-white bg-clip-text mb-4'>welcome to the Drew House Laundry</h2>
                        </div>
                        <div className='text-center pt-20'>
                            <h4 className='sm:text-xl text-md font-thin text-center  text-white bg-clip-text mb-2'> sign up and stay tune </h4>
                        </div>
                        <div className='max-w-xl mx-auto py-1 px-4 sm:px-6 lg:px-8'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {isLoginError && (
                                    <div className='mt-4 bg-red-500 p-3 rounded'>
                                        <p className='text-white text-sm font-bold'>Email atau password salah, silakan coba kembali!</p>
                                    </div>
                                )}
                                {isLoginSuccess && (
                                    <div className='mt-4 bg-green-500 p-3 rounded'>
                                        <p className='text-white text-sm font-bold'>Login Sukses, Selamat datang kembali!</p>
                                    </div>
                                )}
                                <div className='mt-0'>
                                    <label className='block mb-2' htmlFor='email'></label>
                                    <input className='shadow appearance-none w-full py-3 px-3 text-gray-700 leading-tight text-xs font-mono border-solid border-2 border-black focus:outline-none focus:shadow-outline' id='email' name='email' type='email' placeholder='Email' required {...register('email', { required: true })} />
                                </div>
                                <div className='mt-2'>
                                    <label className='block mb-2' htmlFor='password'></label>
                                    <input className='shadow appearance-none w-full py-3 px-3 text-gray-700 mb-3 leading-tight text-xs font-mono border-solid border-2 border-black focus:outline-none focus:shadow-outline' id='password' name='password' type='password' placeholder='password' required {...register('password', { required: true })} />
                                </div>
                                <div className='mt-4 justify-center relative'>
                                    <button className='text-center border-solid border-4 border-black bg-yellow-500 hover:bg-yellow-600 min-w-fit text-black font-mono py-1 px-2 focus:outline-none focus:shadow-outline' type='submit'>
                                        submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    )
}
