import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Footer } from '../../'

import axios from '../../../config/axios'
import cookies from '../../../config/cookie'
import { SidebarAdmin } from '../../'

export default function AddMember() {
    // Reuired State
    const [isRegisterError, setIsRegisterError] = useState()
    const [isRegisterSuccess, setIsRegisterSuccess] = useState()

    // Define Validate Form
    const { handleSubmit, register } = useForm()

    // Get Data from Cookie
    const cookie = cookies.getCookies()

    // Header Config
    let headerConfig = { Authorization: `Bearer ${cookie}` }

    // POST Data From Register Member Form
    const onSubmit = async (data) => {
        const body = {
            name: data.name,
            address: data.address,
            gender: data.gender,
            phone: data.phone
        }

        try {
            const response = await axios.post('/member/', body, { headers: headerConfig })

            if (response.data.message === 'Member already exist') throw new Error(response.data.message)

            if (response.data.message === 'Member created successfully') {
                setIsRegisterSuccess(true)
                setTimeout(() => {
                    window.location.href = '/admin/member'
                }, 1500)
            }
        } catch (error) {
            setIsRegisterError(true)
        }
    }

    return (
        <>
            <SidebarAdmin />
            <section className='bg-white md:ml-64 min-h-screen'>
                <div className='max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='container bg-white rounded p-5'>
                        <div className='text-center'>
                            <h1 className='font-bold text-4xl'>Daftar Pelanggan</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {isRegisterError && (
                                <div className='mt-4 bg-red-500 p-3 '>
                                    <p className='text-white text-sm font-bold'>Pelanggan sudah terdaftar</p>
                                </div>
                            )}
                            {isRegisterSuccess && (
                                <div className='mt-4 bg-green-500 p-3 '>
                                    <p className='text-white text-sm font-bold'>Pelanggan berhasil ditambahkan</p>
                                </div>
                            )}
                            <div className='mt-20'>
                                <input className='shadow text-lg border-solid border-2 border-gray-900 appearance-none font-mono w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' placeholder='nama' {...register('name', { required: true })} />
                            </div>
                            <div className='mt-6'>
                                <input className='shadow text-lg border-solid border-2 border-gray-900 appearance-none font-mono w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline' id='address' type='text' placeholder='alamat' {...register('address', { required: true })} />
                            </div>
                            <div className='mt-6'>
                                <select className='shadow text-lg border-solid border-2 border-gray-900 appearance-none font-mono w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline' id='role' name='role' placeholder='gender' {...register('gender', { required: true })}>
                                    <option value='male'>male</option>
                                    <option value='female'>female</option>
                                </select>
                            </div>
                            <div className='mt-6'>
                                <input className='shadow text-lg border-solid border-2 border-gray-900 appearance-none font-mono w-full py-3 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='phone' type='text' placeholder='telephone' {...register('phone', { required: true })} />
                            </div>
                            <div className='mt-6'>
                                <button className='bg-yellow-500 hover:bg-yellow-600 w-full text-black font-bold py-4 px-2  focus:outline-none focus:shadow-outline' type='submit'>
                                    register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
