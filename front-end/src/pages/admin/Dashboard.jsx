import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCartPlus, FaEdit } from 'react-icons/fa'
import gif from '../../assets/dashboard-gif.png'

import axios from '../../config/axios'
import cookies from '../../config/cookie'
import { SidebarAdmin } from '../../components'
import { Footer } from '../../components'

export default function Dashboard() {
    // Required State
    const [dataOutlet, setDataOutlet] = useState([])
    const [dataMember, setDataMember] = useState([])
    const [dataTransaction, setDataTransaction] = useState([])
    const [dataUser, setDataUser] = useState([])

    // Get Data from Cookie
    const cookie = cookies.getCookies()

    // Authorization Config
    let headerConfig = { Authorization: `Bearer ${cookie}` }

    // Get All Data Outlet from API
    useEffect(() => {
        // Outlet
        const getDataOutlet = async () => {
            await axios.get('/outlet', { headers: headerConfig })
                .then(res => setDataOutlet(res.data.data))
                .catch(err => console.log(err))
        }

        // Member
        const getDataMember = async () => {
            await axios.get('/member', { headers: headerConfig })
                .then(res => setDataMember(res.data.data))
                .catch(err => console.log(err))
        }

        // Transaction
        const getDataTransaction = async () => {
            await axios.get('/transaction', { headers: headerConfig })
                .then(res => setDataTransaction(res.data.data))
                .catch(err => console.log(err))
        }

        // User
        const getDataUser = async () => {
            await axios.get('/admin', { headers: headerConfig })
                .then(res => setDataUser(res.data.data))
                .catch(err => console.log(err))
        }

        Promise.all([
            getDataOutlet(),
            getDataMember(),
            getDataTransaction(),
            getDataUser()
        ])
    }, [])

    // Function Format Member Name from id
    const formatMemberName = (id) => {
        if (!id) return ''

        const member = dataMember.find(member => member._id === id)
        return member.name
    }

    // Function Format User Name from id
    const formatUserName = (id) => {
        if (!id) return ''

        const user = dataUser.find(user => user._id === id)
        return user.name
    }

    // Function Get Status Payment String
    const getStatusPayment = (status) => {
        switch (status) {
            case "unpaid": return <p className='bg-red-500 px-2 py-0.5 rounded-xl text-white font-bold whitespace-no-wrap'>Belum Lunas</p>
            case "paid": return <p className='bg-green-500 px-2 py-0.5 rounded-xl text-white font-bold whitespace-no-wrap'>Lunas</p>
            default: return <p className='bg-blue-500 px-2 py-0.5 rounded-xl text-white font-bold whitespace-no-wrap'>Belum Terkonfirmasi</p>
        }
    }

    // Function Get Status Transaction String
    const getStatusTransaction = (status) => {
        switch (status) {
            case "pending": return <p className='bg-yellow-500 px-2 py-0.5 rounded-xl text-white font-bold whitespace-no-wrap'>Proses</p>
            case "done": return <p className='bg-green-500 px-2 py-0.5 rounded-xl text-white font-bold whitespace-no-wrap'>Selesai</p>
            case "canceled": return <p className='bg-red-500 px-2 py-0.5 rounded-xl text-white font-bold whitespace-no-wrap'>Dibatalkan</p>
            default: return <p className='bg-blue-500 px-2 py-0.5 rounded-xl text-white font-bold whitespace-no-wrap'>Mengantri</p>
        }
    }

    // Function Format Date from API
    const formatDate = (date) => {
        let newDate = new Date(date)
        let day = newDate.getDate()
        let month = newDate.getMonth() + 1
        let year = newDate.getFullYear()
        return `${day}/${month}/${year}`
    }

    return (
        <>
            <SidebarAdmin />
            <section className='bg-white md:ml-64 min-h-screen'>
                <div className='container'>
                    <div className='flex flex-wrap'>
                        <div flex justify-center items-center mx-auto>
                            <img src={gif}
                                className=' w-screen object-center '
                            />
                            <h2 className='mt-10 text-2xl font-bold text-black'>our comunity</h2>
                            <span className='text-sm font-mono text-gray-500'>drew house is a community,a place where you can be
                                <p className='mt-1'>yourself and loved, encouraged, safe and valued</p></span>
                        </div>
                        <div className='w-full p-10 mt-7'>
                            <h2 className='text-right text-6xl font-primary text-black'>Welcome to the Drew House</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 py-5 gap-4'>
                                <div className='bg-white shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-yellow-500 text-slate-800 font-medium group'>
                                    <div className='flex justify-center items-center w-14 h-14 bg-yellow-500 rounded-full transition-all duration-300 transform group-hover:rotate-12'>
                                        <svg width='30' height='30' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='stroke-current text-slate-800 transform transition-transform duration-500 ease-in-out'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
                                        </svg>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-2xl'>{dataOutlet.length}</p>
                                        <p>Our Outlet</p>
                                    </div>
                                </div>
                                <div className='bg-white shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-yellow-500 text-slate-800 font-medium group'>
                                    <div className='flex justify-center items-center w-14 h-14 bg-yellow-500 rounded-full transition-all duration-300 transform group-hover:rotate-12'>
                                        <svg width='30' height='30' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='stroke-current text-slate-800 transform transition-transform duration-500 ease-in-out'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                                        </svg>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-2xl'>{dataMember.length}</p>
                                        <p>Clients</p>
                                    </div>
                                </div>
                                <div className='bg-white shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-yellow-400 text-slate-800 font-medium group'>
                                    <div className='flex justify-center items-center w-14 h-14 bg-yellow-400 rounded-full transition-all duration-300 transform group-hover:rotate-12'>
                                        <svg width='30' height='30' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='stroke-current text-slate-800 transform transition-transform duration-500 ease-in-out'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                                        </svg>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-2xl'>{dataTransaction.length}</p>
                                        <p>Total Transaction</p>
                                    </div>
                                </div>
                                <div className='bg-white shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-yellow-500 text-slate-800 font-medium group'>
                                    <div className='flex justify-center items-center w-14 h-14 bg-yellow-500 rounded-full transition-all duration-300 transform group-hover:rotate-12'>
                                        <svg width='30' height='30' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='stroke-current text-slate-800 transform transition-transform duration-500 ease-in-out'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                        </svg>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-2xl'>{dataUser.length}</p>
                                        <p>Total User</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full p-10'>
                            <div className='flex items-center justify-between pb-6'>
                                <div>
                                    <h2 className='text-black text-2xl font-semibold'>Transaction List</h2>
                                </div>
                                <div className='flex flex-wrap items-center justify-between'>
                                    <div className='lg:ml-40 ml-10 space-x-8'>
                                        <Link to='/admin/transaction/add' className='flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer'><FaCartPlus className='mr-2' /> Add Transaction</Link>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                        {!dataUser.length || !dataMember.length || !dataOutlet.length || !dataTransaction.length ? (
                                            <p className='text-white text-center mx-auto'>Memuat Data📦...</p>
                                        ) : (
                                            <table className='min-w-full leading-normal'>
                                                <thead>
                                                    <tr>
                                                        <th
                                                            className='px-5 py-3 border-b-2 border-yellow-200 bg-whit text-left text-xs font-semibold text-slate-800 uppercase tracking-wider'>
                                                            No
                                                        </th>
                                                        <th
                                                            className='px-5 py-3 border-b-2 border-yellow-200 bg-whit text-left text-xs font-semibold text-slate-800 uppercase tracking-wider'>
                                                            Nama Member
                                                        </th>
                                                        <th
                                                            className='px-5 py-3 border-b-2 border-yellow-200 bg-whit text-left text-xs font-semibold text-slate-800 uppercase tracking-wider'>
                                                            Tanggal
                                                        </th>
                                                        <th
                                                            className='px-5 py-3 border-b-2 border-yellow-200 bg-whit text-left text-xs font-semibold text-slate-800 uppercase tracking-wider'>
                                                            Tanggal Selesai
                                                        </th>
                                                        <th
                                                            className='px-5 py-3 border-b-2 border-yellow-200 bg-whit text-left text-xs font-semibold text-slate-800 uppercase tracking-wider'>
                                                            Tanggal Bayar
                                                        </th>
                                                        <th
                                                            className='px-5 py-3 border-b-2 border-yellow-200 bg-whit text-left text-xs font-semibold text-slate-800 uppercase tracking-wider'>
                                                            Status Pembayaran
                                                        </th>
                                                        <th
                                                            className='px-5 py-3 border-b-2 border-yellow-200 bg-whit text-left text-xs font-semibold text-slate-800 uppercase tracking-wider'>
                                                            Status Pengerjaan
                                                        </th>
                                                        <th
                                                            className='px-5 py-3 border-b-2 border-yellow-200 bg-whit text-left text-xs font-semibold text-slate-800 uppercase tracking-wider'>
                                                            Nama Petugas
                                                        </th>
                                                        <th
                                                            className='px-5 py-3 border-b-2 border-yellow-200 bg-whit text-left text-xs font-semibold text-slate-800 uppercase tracking-wider'>
                                                            Aksi
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataTransaction.map((val, index) => {
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
                                                                        <div className='flex-shrink-0 w-10 h-10'>
                                                                            <img className='w-full h-full rounded-full'
                                                                                src='https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg'
                                                                                alt='Member Profile Picture' />
                                                                        </div>
                                                                        <div className='ml-3'>
                                                                            <p className='text-gray-900 whitespace-no-wrap'>
                                                                                {formatMemberName(val.memberId)}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <div className='flex items-center'>
                                                                        <p className='text-gray-900 whitespace-no-wrap'>
                                                                            {formatDate(val.date)}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <div className='flex items-center'>
                                                                        <p className='text-gray-900 whitespace-no-wrap'>
                                                                            {formatDate(val.deadline)}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <div className='flex items-center'>
                                                                        <p className='text-gray-900 whitespace-no-wrap'>
                                                                            {formatDate(val.datePayment)}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <div className='flex items-center'>
                                                                        {getStatusPayment(val.statusPayment)}
                                                                    </div>
                                                                </td>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <div className='flex items-center'>
                                                                        {getStatusTransaction(val.status)}
                                                                    </div>
                                                                </td>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <div className='flex items-center'>
                                                                        <div className='flex-shrink-0 w-10 h-10'>
                                                                            <img className='w-full h-full rounded-full'
                                                                                src='https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg'
                                                                                alt='Admin Profile Picture' />
                                                                        </div>
                                                                        <div className='ml-3'>
                                                                            <p className='text-gray-900 whitespace-no-wrap'>
                                                                                {formatUserName(val.adminId)}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                    <Link to={`/admin/transaction/edit/${val._id}`} className='flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer'><FaEdit className='mr-2' /> Ubah</Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-yellow-500 pt-20 pb-3 px-5 max-w-full h-96 mx-auto'>
                    <div className='container'>
                        <div className='flex flex-wrap'>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    )
}
