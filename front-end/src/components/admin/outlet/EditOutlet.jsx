import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit, FaTrash } from 'react-icons/fa'

import axios from '../../../config/axios'
import cookies from '../../../config/cookie'
import { SidebarAdmin } from '../../'

export default function EditOutlet() {
    // Required State
    const [data, setData] = useState([])

    const [isUpdateOutletError, setIsUpdateOutletError] = useState()
    const [isUpdateOutletSuccess, setIsUpdateOutletSuccess] = useState()

    // Get Data from Cookie
    const cookie = cookies.getCookies()

    // GET Id from URL
    const id = window.location.pathname.split('/')[4]

    // Authorization Config
    let headerConfig = { Authorization: `Bearer ${cookie}` }

    // GET Data Outlet from Params
    useEffect(() => {
        axios.get(`/outlet/${id}`, { headers: headerConfig })
            .then(res => setData(res.data.data))
            .catch(err => console.log(err))
    }, [])

    // Define Validate form
    const { handleSubmit, register } = useForm()

    // PUT Data Outlet
    const onSubmit = async (data) => {
        const body = {
            name: data.name,
            address: data.address,
            phone: data.phone
        }

        try {
            const response = await axios.put(`/outlet/${id}`, body, { headers: headerConfig })

            if (response.data.message === 'Outlet not found') throw new Error(response.data.message)

            if (response.data.message === 'Outlet updated successfully') {
                setIsUpdateOutletSuccess(true)
                setTimeout(() => window.location.href = '/admin/outlet', 1500)
            }
        } catch (error) {
            setIsUpdateOutletError(true)
        }
    }

    // DELETE Data Outlet
    const dropOutlet = async () => {
        if (window.confirm('Apakah Anda yakin menghapus data ini?')) {
            await axios.delete(`/outlet/${id}`, { headers: headerConfig })
                .then(res => {
                    alert(res.data.message)
                    window.location.href = '/admin/outlet'
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <SidebarAdmin />
            <section className='bg-white md:ml-64 min-h-screen'>
                <div className='max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='container bg-white rounded p-5'>
                        <div className='text-center'>
                            <h1 className='font-bold text-xl'>Ubah Outlet</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {isUpdateOutletError && (
                                <div className='mt-4 bg-red-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Maaf, gagal untuk mengubah data!</p>
                                </div>
                            )}
                            {isUpdateOutletSuccess && (
                                <div className='mt-4 bg-green-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Data outlet berhasil diubah!</p>
                                </div>
                            )}
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='idMember'>
                                    Id Outlet
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='id' type='text' value={data._id} placeholder='Id Petugas' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                    Nama
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' value={data.name} placeholder='Nama' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                    Ganti Nama
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='address' type='text' placeholder='Nama' {...register('name')} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>
                                    Alamat
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='address' type='text' value={data.address} placeholder='Alamat' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>
                                    Ganti Alamat
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='address' type='text' placeholder='Alamat' {...register('address')} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
                                    No. Telepon
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='phone' type='text' value={data.phone} placeholder='No. Telepon' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
                                    Ganti No. Telepon
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='phone' type='text' placeholder='No. Telepon' {...register('phone')} />
                            </div>
                            <div className='mt-4'>
                                <button className='flex items-center justify-center bg-sky-500 hover:bg-sky-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                                    <FaEdit className='mr-2 text-xl' /> Update Data
                                </button>
                            </div>
                        </form>
                        <div className='mt-4'>
                            <button className='flex items-center justify-center bg-red-500 hover:bg-red-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={dropOutlet}>
                                <FaTrash className='mr-2' /> Hapus Data
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
