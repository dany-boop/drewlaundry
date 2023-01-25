import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import axios from '../../../config/axios'
import cookies from '../../../config/cookie'
import { SidebarAdmin } from '../../'

export default function AddOutlet() {
    // Reuired State
    const [isRegisterError, setIsRegisterError] = useState()
    const [isRegisterSuccess, setIsRegisterSuccess] = useState()

    // Define Validate Form
    const { handleSubmit, register } = useForm()

    // Get Data from Cookie
    const cookie = cookies.getCookies()

    // Header Config
    let headerConfig = { Authorization: `Bearer ${cookie}` }

    // POST Data From Register Outlet Form
    const onSubmit = async (data) => {
        const body = {
            name: data.name,
            address: data.address,
            phone: data.phone
        }

        try {
            const response = await axios.post('/outlet/', body, { headers: headerConfig })

            if (response.data.message === 'Outlet already exist') throw new Error(response.data.message)

            if (response.data.message === 'Outlet created successfully') {
                setIsRegisterSuccess(true)
                setTimeout(() => window.location.href = '/admin/outlet', 1500)
            }
        } catch (error) {
            setIsRegisterError(true)
        }
    }

    return (
        <>
            <SidebarAdmin />
            <section className='bg-slate-100/50 md:ml-64 min-h-screen'>
                <div className='max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='container p-5'>
                        <div className='text-center'>
                            <h1 className='font-bold text-xl'>add outlet</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {isRegisterError && (
                                <div className='mt-4 bg-red-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Outlet sudah terdaftar</p>
                                </div>
                            )}
                            {isRegisterSuccess && (
                                <div className='mt-4 bg-green-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Outlet berhasil ditambahkan</p>
                                </div>
                            )}
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                    outlet name
                                </label>
                                <input className='shadow  text-md border-solid border-2 border-gray-900 appearance-none font-mono w-full py-2 px-3 text-gray-800  leading-tight focus:outline-none focus:shadow-outline focus:shadow-black' id='name' type='text' placeholder='outlet name' {...register('name', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>
                                    address
                                </label>
                                <input className='shadow appearance-none text-md border-solid border-2 border-gray-900 font-mono w-full py-2 px-3 text-gray-800  leading-tight focus:outline-none focus:shadow-outline focus:shadow-black' id='address' type='text' placeholder='Alamat' {...register('address', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
                                    telephone
                                </label>
                                <input className='shadow appearance-none text-md border-solid border-2 border-gray-900 font-mono w-full py-2 px-3 text-gray-800  mb-3 leading-tight focus:outline-none focus:shadow-outline focus:shadow-black' id='phone' type='text' placeholder='No. Telepon' {...register('phone', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <button className='bg-yellow-500 hover:bg-yellow-600 w-full text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                                    register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
