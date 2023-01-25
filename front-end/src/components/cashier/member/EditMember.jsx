import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaUserEdit, FaTrash } from 'react-icons/fa'

import axios from '../../../config/axios'
import cookies from '../../../config/cookie'
import { SidebarCashier } from '../../'

export default function EditMember() {
    // Required State
    const [data, setData] = useState([])

    const [isUpdateMemberError, setIsUpdateMemberError] = useState()
    const [isUpdateMemberSuccess, setIsUpdateMemberSuccess] = useState()

    // Get Data from Cookie
    const cookie = cookies.getCookies()

    // GET Id from URL
    const id = window.location.pathname.split('/')[4]

    // Authorization Config
    let headerConfig = { Authorization: `Bearer ${cookie}` }

    // GET Data Member from Params
    useEffect(() => {
        axios.get(`/member/${id}`, { headers: headerConfig })
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // Define Validate form
    const { handleSubmit, register } = useForm()

    // PUT Data Member
    const onSubmit = async (data) => {
        const body = {
            address: data.address,
            phone: data.phone
        }

        try {
            const response = await axios.put(`/member/${id}`, body, { headers: headerConfig })

            if (response.data.message === 'Member not found') throw new Error(response.data.message)

            if (response.data.message === 'Member updated successfully') {
                setIsUpdateMemberSuccess(true)
                setTimeout(() => {
                    window.location.href = '/cashier/member'
                }, 1500)
            }
        } catch (error) {
            setIsUpdateMemberError(true)
        }
    }

    // DELETE Data Member
    const dropMember = async () => {
        if (window.confirm('Apakah Anda yakin menghapus data ini?')) {
            await axios.delete(`/member/${id}`, { headers: headerConfig })
                .then(res => {
                    alert(res.data.message)
                    window.location.href = '/cashier/member'
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <>
            <SidebarCashier />
            <section className='bg-gray-900 md:ml-64 min-h-screen'>
                <div className='max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='container bg-white rounded p-5'>
                        <div className='text-center'>
                            <h1 className='font-bold text-xl'>Ubah Pelanggan</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {isUpdateMemberError && (
                                <div className='mt-4 bg-red-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Maaf, gagal untuk mengubah data!</p>
                                </div>
                            )}
                            {isUpdateMemberSuccess && (
                                <div className='mt-4 bg-green-500 p-3 rounded'>
                                    <p className='text-white text-sm font-bold'>Data member berhasil diubah!</p>
                                </div>
                            )}
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='idMember'>
                                    Id Member
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
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='gender'>
                                    Jenis Kelamin
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='gender' type='text' value={data.gender} placeholder='Jenis Kelamin' disabled />
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
                                    <FaUserEdit className='mr-2 text-xl' /> Update Data
                                </button>
                            </div>
                        </form>
                        <div className='mt-4'>
                            <button className='flex items-center justify-center bg-red-500 hover:bg-red-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={dropMember}>
                                <FaTrash className='mr-2' /> Hapus Data
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
