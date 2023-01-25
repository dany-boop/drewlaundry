import React, { useState, useEffect, createRef } from 'react'
import { FaFileDownload } from 'react-icons/fa'
import Pdf from 'react-to-pdf'

import axios from '../../../config/axios'
import cookies from '../../../config/cookie'
import { SidebarOwner } from '../../'
import logo from './logo.png'

export default function EditTransaction() {
    // Required State
    const [data, setData] = useState([])
    const [dataDetail, setDataDetail] = useState([])
    const [dataPackage, setDataPackage] = useState([])
    const [dataMember, setDataMember] = useState([])
    const [dataUser, setDataUser] = useState([])

    // Get Data from Cookie
    const cookie = cookies.getCookies()

    // GET Id from URL
    const id = window.location.pathname.split('/')[4]

    // Authorization Config
    let headerConfig = { Authorization: `Bearer ${cookie}` }

    // GET Data Transaction from Params
    useEffect(() => {
        // Transaction
        const getDataTransaction = async () => {
            await axios.get(`/transaction/${id}`, { headers: headerConfig })
                .then(res => setData(res.data.data))
                .catch(err => console.log(err))
        }

        // Transaction Detail
        const getDataTransactionDetail = async () => {
            await axios.get(`/transaction-detail/${id}`, { headers: headerConfig })
                .then(res => setDataDetail(res.data.data))
                .catch(err => console.log(err))
        }

        // Package
        const getDataPackage = async () => {
            await axios.get(`/package`, { headers: headerConfig })
                .then(res => setDataPackage(res.data.data))
                .catch(err => console.log(err))
        }

        // Member
        const getDataMember = async () => {
            await axios.get('/member', { headers: headerConfig })
                .then(res => setDataMember(res.data.data))
                .catch(err => console.log(err))
        }

        // User
        const getDataUser = async () => {
            await axios.get('/admin', { headers: headerConfig })
                .then(res => setDataUser(res.data.data))
                .catch(err => console.log(err))
        }

        Promise.all([
            getDataTransaction(),
            getDataTransactionDetail(),
            getDataPackage(),
            getDataMember(),
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

    // Function Format Package Name from id
    const formatPackageName = (id) => {
        if (!id) return ''

        const paket = dataPackage.find(paket => paket._id === id)
        return paket.name
    }

    // Function Get Price from Package Id
    const getPrice = (id) => {
        if (!id) return ''

        const paket = dataPackage.find(paket => paket._id === id)
        return paket.price
    }

    // Function Format Date from API
    const formatDate = (date) => {
        let newDate = new Date(date)
        let day = newDate.getDate()
        let month = newDate.getMonth() + 1
        let year = newDate.getFullYear()
        return `${day}-${month}-${year}`
    }

    // React to PDF
    const ref = createRef()

    return (
        <>
            <SidebarOwner />
            <section className='bg-gray-900 md:ml-64 min-h-screen'>
                <div className='max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='container bg-white rounded p-5'>
                        <div className='text-center'>
                            <h1 className='font-bold text-xl'>Detail Transaksi</h1>
                        </div>
                        <form>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='idTransaction'>
                                    Id Transaksi
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='idTransaction' type='text' value={data._id} placeholder='Id Transaksi' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='memberId'>
                                    Nama Member
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='memberId' type='text' value={formatMemberName(data.memberId)} placeholder='memberId' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='date'>
                                    Tanggal Pemesanan
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='date' type='text' value={formatDate(data.date)} placeholder='Tanggal Pemesanan' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='deadline'>
                                    Tanggal Selesai
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='deadline' type='text' value={formatDate(data.deadline)} placeholder='Tanggal Selesai' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='datePayment'>
                                    Tanggal Bayar
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='datePayment' type='text' value={formatDate(data.datePayment)} placeholder='Tanggal Bayar' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='statusPayment'>
                                    Status Bayar Saat Ini
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='statusPayment' type='text' value={data.statusPayment} placeholder='Status Bayar Saat Ini' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='status'>
                                    Status Pengerjaan Saat Ini
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='status' type='text' value={data.status} placeholder='Status Pengerjaan Saat Ini' disabled />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='gender'>
                                    Nama Petugas
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline' id='gender' type='text' value={formatUserName(data.adminId)} placeholder='Id Petugas' disabled />
                            </div>
                        </form>
                        <div className="mt-4">
                            <Pdf targetRef={ref} filename={`Laporan-Transaksi-${formatDate(data.date)}.pdf`}>
                                {({ toPdf }) => <button className='flex items-center justify-center bg-green-500 hover:bg-green-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={toPdf}><FaFileDownload className='mr-2' /> Unduh Laporan</button>}
                            </Pdf>
                        </div>
                    </div>
                </div>
            </section>

            <section className='absolute top-1 -z-10 md:ml-64 min-h-screen max-w-[790px] mx-auto' ref={ref}>
                <div className='container mx-auto px-4 py-10'>
                    <div className='mx-auto text-center'>
                        <div className='flex justify-center items-center mx-auto'>
                            <img src={logo}
                                className=' w-36 h-7 object-center '
                            />
                        </div>
                        <h1 className='font-semibold font-sans text-4xl pt-4 pb-2'>Laporan Transaksi</h1>
                        <h2>
                            <b>Tanggal Pengukuhan&nbsp;:&nbsp;</b> <span className='font-mono text-gray-600'>09-11-2012</span>
                        </h2>
                        <h3 className='text-gray-600 font-mono pb-2'>Jl.danau ranau,Kel Sawojajar, Kota Malang, Jawa Timur.</h3>
                        <hr className='mt-2 mb-4' />
                    </div>
                    <table className='w-full overflow-x-auto'>
                        <thead>
                            <tr className='note'>
                                <th className='px-4 py-2'>
                                    <p>No Nota&nbsp;:&nbsp;</p>
                                </th>
                                <th className='px-4 py-2'>
                                    <p className='font-mono text-gray-600'>{data._id}</p>
                                </th>
                                <th className='px-4 py-2'>
                                    <p>Tanggal&nbsp;:&nbsp;</p>
                                </th>
                                <th className='px-4 py-2'>
                                    <p className='font-mono text-gray-600'>{formatDate(data.date)}</p>
                                </th>
                            </tr>
                            <tr className=''>
                                <th className='px-4 py-2'>
                                    <p>No</p>
                                </th>
                                <th className='px-4 py-2'>
                                    <p>Daftar Paket</p>
                                </th>
                                <th className='px-4 py-2'>
                                    <p>Harga</p>
                                </th>
                                <th className='px-4 py-2'>
                                    <p>Qty</p>
                                </th>
                                <th className='px-4 py-2'>
                                    <p>Subtotal</p>
                                </th>
                            </tr>
                        </thead>
                        {dataDetail.map((val, index) => {
                            return (
                                <tbody key={index}>
                                    <tr className=''>
                                        <td className='px-4 py-2'>
                                            <p className='font-mono text-gray-600 text-center'>{index + 1}</p>
                                        </td>
                                        <td className='px-4 py-2'>
                                            <p className='font-mono text-gray-600 text-center'>{formatPackageName(val.packageId)}</p>
                                        </td>
                                        <td className='px-4 py-2'>
                                            <p className='font-mono text-gray-600 text-center'>{getPrice(val.packageId)}</p>
                                        </td>
                                        <td className='px-4 py-2'>
                                            <p className='font-mono text-gray-600 text-center'>{val.quantity}</p>
                                        </td>
                                        <td className='px-4 py-2'>
                                            <p className='font-mono text-gray-600 text-center'>{getPrice(val.packageId) * val.quantity}</p>
                                        </td>
                                    </tr>
                                    <tr className=''>
                                        <td className='px-4 py-2'>
                                            <p className='text-white cursor-default'>a</p>
                                        </td>
                                        <td className='px-4 py-2' />
                                        <td className='px-4 py-2' />
                                        <td className='px-4 py-2' />
                                        <td className='px-4 py-2' />
                                    </tr>
                                    <tr className=''>
                                        <td className='px-4 py-2' />
                                        <td className='px-4 py-2' />
                                        <td className='px-4 py-2'>
                                            <p className='font-bold text-center text-sm'>Total (Rp)&nbsp;:&nbsp;</p>
                                        </td>
                                        <td className='px-4 py-2' />
                                        <td className='px-4 py-2'>
                                            <p className='font-mono text-gray-600 text-center'>{getPrice(val.packageId) * val.quantity}</p>
                                        </td>
                                    </tr>
                                    <tr className=''>
                                        <td className='px-4 py-2'>
                                            <p className='font-bold text-center'>
                                                Kasir&nbsp;:&nbsp;
                                                <span className='font-mono text-gray-600'>{formatUserName(data.adminId)}</span>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                    <p className='font-mono text-center mt-9'>THANK YOU FOR VISITING!</p>
                </div>
            </section>
        </>
    )
}
