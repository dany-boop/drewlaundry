import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import axios from '../../../config/axios'
import cookies from '../../../config/cookie'
import { SidebarCashier } from '../../'

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
                setTimeout(() => window.location.href = '/cashier/member', 1500)
            }
        } catch (error) {
            setIsRegisterError(true)
        }
    }

    return (
        <>
            <SidebarCashier />
            <section className='bg-gray-900 md:ml-64 min-h-screen'>
                <div className='max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='container bg-white rounded p-5'>
                        <div className='text-center'>
                            <h1 className='font-bold text-xl'>Daftar Pelanggan</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {isRegisterError && (
                                <div className='mt-4 bg-red-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Pelanggan sudah terdaftar</p>
                                </div>
                            )}
                            {isRegisterSuccess && (
                                <div className='mt-4 bg-green-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Pelanggan berhasil ditambahkan</p>
                                </div>
                            )}
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                    Nama
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' placeholder='Nama' {...register('name', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>
                                    Alamat
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='address' type='text' placeholder='Alamat' {...register('address', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='gender'>
                                    Jenis Kelamin
                                </label>
                                <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='role' name='role' {...register('gender', { required: true })}>
                                    <option defaultValue disabled>Pilih Jenis Kelamin</option>
                                    <option value='male'>male</option>
                                    <option value='female'>female</option>
                                </select>
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
                                    No. Telepon
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='phone' type='text' placeholder='No. Telepon' {...register('phone', { required: true })} />
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
