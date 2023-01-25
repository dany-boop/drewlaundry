import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaUserPlus, FaEdit } from 'react-icons/fa'

import axios from '../../config/axios'
import cookies from '../../config/cookie'
import { SidebarCashier } from '../../components'

export default function Member() {
    // Required State
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [filteredResults, setFilteredResults] = useState([])

    // Get Data from Cookie
    const cookie = cookies.getCookies()

    // Header Config
    let headerConfig = { Authorization: `Bearer ${cookie}` }

    // GET All Data Member from API
    useEffect(() => {
        const getData = async () => {
            await axios.get('/member', { headers: headerConfig })
                .then(res => setData(res.data.data))
                .catch(err => console.log(err))
        }

        getData()
    }, [])

    // Function Get Gender String
    const getGender = (gender) => {
        switch (gender) {
            case "male": return "Laki-Laki"
            default: return "Perempuan"
        }
    }

    // Search Event
    function searchItems(searched) {
        setSearch(searched)
        setFilteredResults(data.filter(item => item.name.toLowerCase().includes(searched.toLowerCase()) || item.address.toLowerCase().includes(searched.toLowerCase()) || item.phone.toLowerCase().includes(searched.toLowerCase())))
    }

    return (
        <>
            <SidebarCashier />
            <section className='bg-gray-900 md:ml-64 min-h-screen'>
                <div className='p-10 rounded-md w-full'>
                    <div className='flex flex-wrap items-center justify-between pb-6'>
                        <div>
                            <h2 className='text-white text-2xl font-semibold'>Daftar Member</h2>
                        </div>
                        <div className='flex flex-wrap items-center justify-between lg:mt-0 mt-5'>
                            <div className='flex bg-gray-50 items-center p-2 rounded-md'>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-gray-400' viewBox='0 0 20 20'
                                    fill='currentColor'>
                                    <path fillRule='evenodd'
                                        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                        clipRule='evenodd' />
                                </svg>
                                <input className='bg-gray-50 outline-none ml-1 block' type='text' name='search' id='search' placeholder='search...' onChange={(event) => searchItems(event.target.value)} />
                            </div>
                            <div className='lg:ml-20 ml-10 space-x-8'>
                                <Link to='/cashier/member/add' className='flex items-center justify-center bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer'><FaUserPlus className='mr-2' /> Tambah Member</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                {!data.length ? (
                                    <p className='text-white text-center mx-auto'>Memuat Data📦...</p>
                                ) : (
                                    <table className='min-w-full leading-normal'>
                                        <thead>
                                            <tr>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                                                    No
                                                </th>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                                                    Id Member
                                                </th>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                                                    Nama
                                                </th>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                                                    Alamat
                                                </th>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                                                    Jenis Kelamin
                                                </th>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                                                    Telepon
                                                </th>
                                                <th
                                                    className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                                                    Aksi
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
                                                                    <div className='flex-shrink-0 w-10 h-10'>
                                                                        <img className='w-full h-full rounded-full'
                                                                            src='https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg'
                                                                            alt='Member Profile Picture' />
                                                                    </div>
                                                                    <div className='ml-3'>
                                                                        <p className='text-gray-900 whitespace-no-wrap'>
                                                                            {val.name}
                                                                        </p>
                                                                    </div>
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
                                                                    {getGender(val.gender)}
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
                                                                <Link to={`/cashier/member/edit/${val._id}`} className='flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer'><FaEdit className='mr-2' /> Ubah</Link>
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
                                                                        <div className='flex-shrink-0 w-10 h-10'>
                                                                            <img className='w-full h-full rounded-full'
                                                                                src='https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg'
                                                                                alt='Member Profile Picture' />
                                                                        </div>
                                                                        <div className='ml-3'>
                                                                            <p className='text-gray-900 whitespace-no-wrap'>
                                                                                {val.name}
                                                                            </p>
                                                                        </div>
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
                                                                        {getGender(val.gender)}
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
                                                                    <Link to={`/cashier/member/edit/${val._id}`} className='flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer'><FaEdit className='mr-2' /> Ubah</Link>
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
