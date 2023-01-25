import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaUserEdit, FaTrash } from 'react-icons/fa'

import axios from '../../../config/axios'
import cookies from '../../../config/cookie'
import { SidebarAdmin } from '../../'

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
            .then(res => setData(res.data.data))
            .catch(err => console.log(err))
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
                setTimeout(() => window.location.href = '/admin/member', 1500)
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
                    window.location.href = '/admin/member'
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <>
            <SidebarAdmin />
            <section className='bg-white md:ml-64 min-h-screen'>
                <div className='max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='container p-5'>
                        <div className='text-center'>
                            <h1 className='font-bold text-xl'>change member data</h1>
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
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                    name
                                </label>
                                <input className='shadow appearance-none border-solid border-2 border-gray-700 w-full py-3 px-3 text-black  focus:shadow-outline' id='name' type='text' value={data.name} placeholder='name' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>
                                    change address
                                </label>
                                <input className='shadow appearance-none border-solid border-2 border-gray-700 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-black' id='address' type='text' placeholder=" alamat" {...register('address')} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='gender'>
                                    gender
                                </label>
                                <input className='shadow appearance-none border-solid border-2 border-gray-700 w-full py-3 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline ' id='gender' type='text' value={data.gender} placeholder='gender' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
                                    change telephone
                                </label>
                                <input className='shadow appearance-none border-solid border-2 border-gray-700 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-black' id='phone' type='text' placeholder='telephone' {...register('phone')} />
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
