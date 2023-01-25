import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaUserPlus } from 'react-icons/fa'

import axios from '../../../config/axios'
import { SidebarAdmin } from '../../'

export default function Register() {
    // Reuired State
    const [isRegisterError, setIsRegisterError] = useState()
    const [isRegisterSuccess, setIsRegisterSuccess] = useState()

    // Define Validate Form
    const { handleSubmit, register } = useForm()

    // POST Data From Register Admin Form
    const onSubmit = async (data) => {
        const body = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role
        }

        try {
            const response = await axios.post('/admin/', body)

            if (response.data.message === 'Admin already exist') throw new Error(response.data.message)

            if (response.data.message === 'Admin created successfully') {
                setIsRegisterSuccess(true)
                setTimeout(() => window.location.href = '/admin/user', 1500)
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
                            <h1 className='font-bold text-xl'>Daftar Petugas</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {isRegisterError && (
                                <div className='mt-4 bg-red-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Admin sudah terdaftar</p>
                                </div>
                            )}
                            {isRegisterSuccess && (
                                <div className='mt-4 bg-green-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Admin berhasil ditambahkan</p>
                                </div>
                            )}
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                    Nama
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' placeholder='Nama' {...register('name', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='role'>
                                    Role
                                </label>
                                <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='role' name='role' {...register('role', { required: true })}>
                                    <option defaultValue disabled>Pilih Role</option>
                                    <option value='admin'>Admin</option>
                                    <option value='cashier'>Kasir</option>
                                    <option value='owner'>Pemilik</option>
                                </select>
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                    Email
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='email' type='email' placeholder='Email' {...register('email', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                                    Password
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='******************' {...register('password', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <button className='flex items-center justify-center bg-sky-500 hover:bg-sky-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                                    <FaUserPlus className='mr-2' /> Tambah Data Petugas
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
