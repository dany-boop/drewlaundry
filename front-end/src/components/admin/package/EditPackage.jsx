import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit, FaTrash } from 'react-icons/fa'

import axios from '../../../config/axios'
import cookies from '../../../config/cookie'
import { SidebarAdmin } from '../../'

export default function EditPackage() {
    // Required State
    const [data, setData] = useState([])

    const [isUpdatePackageError, setIsUpdatePackageError] = useState()
    const [isUpdatePackageSuccess, setIsUpdatePackageSuccess] = useState()

    // Get Data from Cookie
    const cookie = cookies.getCookies()

    // GET Id from URL
    const id = window.location.pathname.split('/')[4]

    // Authorization Config
    let headerConfig = { Authorization: `Bearer ${cookie}` }

    // GET Data Package from Params
    useEffect(() => {
        axios.get(`/package/${id}`, { headers: headerConfig })
            .then(res => setData(res.data.data))
            .catch(err => console.log(err))
    }, [])

    // Define Validate form
    const { handleSubmit, register } = useForm()

    // PUT Data Package
    const onSubmit = async (data) => {
        const body = {
            name: data.name,
            price: data.price,
        }

        try {
            const response = await axios.put(`/package/${id}`, body, { headers: headerConfig })

            if (response.data.message === 'Package not found') throw new Error(response.data.message)

            if (response.data.message === 'Package updated successfully') {
                setIsUpdatePackageSuccess(true)
                setTimeout(() => window.location.href = '/admin/package', 1500)
            }
        } catch (error) {
            setIsUpdatePackageError(true)
        }
    }

    // DELETE Data Package
    const dropPackage = async () => {
        if (window.confirm('Apakah Anda yakin menghapus data ini?')) {
            await axios.delete(`/package/${id}`, { headers: headerConfig })
                .then(res => {
                    alert(res.data.message)
                    window.location.href = '/admin/package'
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <SidebarAdmin />
            <section className='bg-gray-900 md:ml-64 min-h-screen'>
                <div className='max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='container bg-white rounded p-5'>
                        <div className='text-center'>
                            <h1 className='font-bold text-xl'>Ubah Paket Jasa</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {isUpdatePackageError && (
                                <div className='mt-4 bg-red-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Maaf, gagal untuk mengubah data!</p>
                                </div>
                            )}
                            {isUpdatePackageSuccess && (
                                <div className='mt-4 bg-green-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Data paket jasa berhasil diubah!</p>
                                </div>
                            )}
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='idMember'>
                                    Id Paket Jasa
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
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
                                    Harga
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='price' type='text' value={data.price} placeholder='Harga' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
                                    Ganti Harga
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='price' type='text' placeholder='Harga' {...register('price')} />
                            </div>
                            <div className='mt-4'>
                                <button className='flex items-center justify-center bg-sky-500 hover:bg-sky-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                                    <FaEdit className='mr-2 text-xl' /> Update Data
                                </button>
                            </div>
                        </form>
                        <div className='mt-4'>
                            <button className='flex items-center justify-center bg-red-500 hover:bg-red-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={dropPackage}>
                                <FaTrash className='mr-2' /> Hapus Data
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
