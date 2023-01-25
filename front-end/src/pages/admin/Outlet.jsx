import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaFolderPlus, FaEdit } from 'react-icons/fa'

import axios from '../../config/axios'
import cookies from '../../config/cookie'
import { SidebarAdmin } from '../../components'

export default function Outlet() {
    // Required State
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [filteredResults, setFilteredResults] = useState([])

    // Get Data from Cookie
    const cookie = cookies.getCookies()

    // Header Config
    let headerConfig = { Authorization: `Bearer ${cookie}` }

    // GET All Data Outlet from API
    useEffect(() => {
        const getData = async () => {
            await axios.get('/outlet', { headers: headerConfig })
                .then(res => setData(res.data.data))
                .catch(err => console.log(err))
        }

        getData()
    }, [])

    // Search Event
    function searchItems(searched) {
        setSearch(searched)
        setFilteredResults(data.filter(item => item.name.toLowerCase().includes(searched.toLowerCase()) || item.address.toLowerCase().includes(searched.toLowerCase()) || item.phone.toLowerCase().includes(searched.toLowerCase())))
    }

    return (
        <>
            <SidebarAdmin />
            <section className='bg-white md:ml-64 min-h-screen'>
                <div className='p-10 rounded-md w-full'>
                    <div className='flex flex-wrap items-center justify-between pb-6'>
                        <div>
                            <h2 className='text-black text-2xl font-semibold'>Daftar Outlet</h2>
                        </div>
                        <div className='flex flex-wrap items-center justify-between lg:mt-0 mt-5'>
                            <div className='flex items-center p-2 bg-gray-100'>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w- text-gray-400' viewBox='0 0 20 20'
                                    fill='currentColor'>
                                    <path fillRule='evenodd'
                                        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                        clipRule='evenodd' />
                                </svg>
                                <input className='bg-gray-100 outline-none ml-1 block' type='text' name='search' id='search' placeholder='search...' onChange={(event) => searchItems(event.target.value)} />
                            </div>
                            <div className='lg:ml-20 ml-10 space-x-8'>
                                <Link to='/admin/outlet/add' className='flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer'><FaFolderPlus className='mr-2' /> Tambah Outlet</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                {!data.length ? (
                                    <p className='text-white text-center mx-auto'>Memuat Data...</p>
                                ) : (
                                    <table className='min-w-full leading-normal'>
                                        <thead>
                                            <tr>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-yellow-500 text-left text-md font-semibold text-black tracking-wider'>
                                                    no.
                                                </th>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-yellow-500 text-left text-md font-semibold text-black tracking-wider'>
                                                    id outlet
                                                </th>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-yellow-500 text-left text-md font-semibold text-black tracking-wider'>
                                                    nama
                                                </th>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-yellow-500 text-left text-md font-semibold text-black tracking-wider'>
                                                    alamat
                                                </th>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-yellow-500 text-left text-md font-semibold text-black tracking-wider'>
                                                    telepon
                                                </th>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-yellow-500 text-left text-md font-semibold text-black tracking-wider'>
                                                    aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                search.length > 1 && filteredResults.length === 0 && (
                                                    <tr>
                                                        <td colSpan='8' className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <p className='text-gray-900 text-center'>
                                                                Maaf, data yang anda cari tidak dapat ditemukan.
                                                            </p>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            {
                                                search.length > 1 ? (
                                                    filteredResults.map((val, index) => (
                                                        <tr key={index}>
                                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                <div className='flex items-center'>
                                                                    <p className='text-gray-900 whitespace-no-wrap'>
                                                                        {index + 1}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                <div className='flex items-center'>
                                                                    <p className='text-gray-900 whitespace-no-wrap'>
                                                                        {val._id}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                <div className='flex items-center'>
                                                                    <p className='text-gray-900 whitespace-no-wrap'>
                                                                        {val.name}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                <div className='flex items-center'>
                                                                    <p className='text-gray-900 whitespace-no-wrap'>
                                                                        {val.address}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                <div className='flex items-center'>
                                                                    <p className='text-gray-900 whitespace-no-wrap'>
                                                                        {val.phone}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                <Link to={`/admin/outlet/edit/${val._id}`} className='flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer'><FaEdit className='mr-2' />Ubah</Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    data.map((val, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <div className='flex items-center'>
                                                                        <p className='text-gray-900 whitespace-no-wrap'>
                                                                            {index + 1}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <div className='flex items-center'>
                                                                        <p className='text-gray-900 whitespace-no-wrap'>
                                                                            {val._id}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <div className='flex items-center'>
                                                                        <p className='text-gray-900 whitespace-no-wrap'>
                                                                            {val.name}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <div className='flex items-center'>
                                                                        <p className='text-gray-900 whitespace-no-wrap'>
                                                                            {val.address}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <div className='flex items-center'>
                                                                        <p className='text-gray-900 whitespace-no-wrap'>
                                                                            {val.phone}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <Link to={`/admin/outlet/edit/${val._id}`} className='flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer'><FaEdit className='mr-2' />change</Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                            }
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
