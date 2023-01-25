import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import axios from '../../../config/axios'
import cookies from '../../../config/cookie'
import { SidebarAdmin } from '../../'

export default function AddPackage() {
    // Reuired State
    const [isRegisterError, setIsRegisterError] = useState()
    const [isRegisterSuccess, setIsRegisterSuccess] = useState()

    // Define Validate Form
    const { handleSubmit, register } = useForm()

    // Get Data from Cookie
    const cookie = cookies.getCookies()

    // Header Config
    let headerConfig = { Authorization: `Bearer ${cookie}` }

    // POST Data From Register Package Form
    const onSubmit = async (data) => {
        const body = {
            name: data.name,
            price: data.price,
        }

        try {
            const response = await axios.post('/package/', body, { headers: headerConfig })

            if (response.data.message === 'Package already exist') throw new Error(response.data.message)

            if (response.data.message === 'Package created successfully') {
                setIsRegisterSuccess(true)
                setTimeout(() => window.location.href = '/admin/package', 1500)
            }
        } catch (error) {
            setIsRegisterError(true)
        }
    }

    return (
        <>
            <SidebarAdmin />
            <section className='bg-gray-900 md:ml-64 min-h-screen'>
                <div className='max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='container bg-white rounded p-5'>
                        <div className='text-center'>
                            <h1 className='font-bold text-xl'>Daftar Paket Jasa</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {isRegisterError && (
                                <div className='mt-4 bg-red-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Paket Jasa sudah terdaftar</p>
                                </div>
                            )}
                            {isRegisterSuccess && (
                                <div className='mt-4 bg-green-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Paket Jasa berhasil ditambahkan</p>
                                </div>
                            )}
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                    Nama
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' placeholder='Nama' {...register('name', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
                                    Harga
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='price' type='text' placeholder='Harga' {...register('price', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <button className='bg-sky-500 hover:bg-sky-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
