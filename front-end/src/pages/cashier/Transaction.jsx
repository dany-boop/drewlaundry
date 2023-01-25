import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaCartPlus } from 'react-icons/fa'

import axios from '../../config/axios'
import cookies from '../../config/cookie'
import { SidebarCashier } from '../../components'

export default function Transaction() {
    // Reuired State
    const [isRegisterError, setIsRegisterError] = useState()
    const [isRegisterSuccess, setIsRegisterSuccess] = useState()

    const [dataMember, setDataMember] = useState([])
    const [dataPackage, setDataPackage] = useState([])
    const [dataAdmin, setDataAdmin] = useState([])

    const [totalPackage, setTotalPackage] = useState()

    // Define Validate Form
    const { handleSubmit, register } = useForm()

    // Get Data from Cookie
    const cookie = cookies.getCookies()

    // Header Config
    let headerConfig = { Authorization: `Bearer ${cookie}` }

    // GET Data Member
    useEffect(() => {
        // Member
        const getDataMember = async () => {
            await axios.get('/member', { headers: headerConfig })
                .then(res => setDataMember(res.data.data))
                .catch(err => console.log(err))
        }

        // Package
        const getDataPackage = async () => {
            axios.get('/package', { headers: headerConfig })
                .then(res => setDataPackage(res.data.data))
                .catch(err => console.log(err))
        }

        // Admin
        const getDataAdmin = async () => {
            axios.get('/admin', { headers: headerConfig })
                .then(res => setDataAdmin(res.data.data))
                .catch(err => console.log(err))
        }

        Promise.all([
            getDataMember(),
            getDataPackage(),
            getDataAdmin(),
        ])
    }, [])

    // POST Data From New Transaction Form
    const onSubmit = async (data) => {
        const bodyTransaction = {
            memberId: data.memberId,
            date: data.date,
            deadline: data.deadline,
            datePayment: data.datePayment,
            statusPayment: data.statusPayment,
            status: data.status,
            adminId: data.adminId,
        }

        try {
            await axios.post('/transaction', bodyTransaction, { headers: headerConfig })
                .then(res => {
                    if (res.data.message === 'Transaction created successfully') {
                        const transactionId = res.data.data._id
                        const bodyDetailTransaction = {
                            transactionId: transactionId,
                            packageId: data.packageId,
                            quantity: data.quantity,
                        }

                        axios.post('/transaction-detail', bodyDetailTransaction, { headers: headerConfig })
                            .then(res => {
                                setIsRegisterSuccess(true)
                                setTimeout(() => window.location.href = '/cashier/dashboard', 1500)
                            })
                            .catch(err => console.log(err))
                    }
                })
                .catch(err => console.log(err))
        } catch (error) { setIsRegisterError(true) }
    }

    return (
        <>
            <SidebarCashier />
            <section className='bg-gray-900 md:ml-64 min-h-screen'>
                <div className='max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='container bg-white rounded p-5'>
                        <div className='text-center'>
                            <h1 className='font-bold text-xl'>Tambah Transaksi</h1>
                        </div>
                        {isRegisterError && (
                            <div className='mt-4 bg-red-500 p-3 rounded'>
                                <p className='text-white text-sm font-bold'>Maaf, transaksi gagal. Silakan coba kembali</p>
                            </div>
                        )}
                        {isRegisterSuccess && (
                            <div className='mt-4 bg-green-500 p-3 rounded'>
                                <p className='text-white text-sm font-bold'>Selamat! Transaksi berhasil.</p>
                            </div>
                        )}
                        <div className='mt-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                Jumlah Paket Jasa
                            </label>
                            <div className='flex'>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='totalPackage' id='totalPackage' type='number' placeholder='Jumlah Paket Jasa' min={0} value={totalPackage} onChange={(event) => setTotalPackage(event.target.value)} />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='memberId'>
                                    Nama Pelanggan
                                </label>
                                <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='memberId' name='memberId' {...register('memberId', { required: true })}>
                                    <option defaultValue disabled>Pilih Nama Member</option>
                                    {dataMember.map((item, index) => {
                                        return (
                                            <option key={index} value={item._id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='date'>
                                    Tanggal Pemesanan
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='date' type='date' placeholder='Tanggal Pemesanan' {...register('date', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='deadline'>
                                    Tanggal Selesai
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='deadline' type='date' placeholder='Tanggal Pemesanan' {...register('deadline', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='datePayment'>
                                    Tanggal Bayar
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='datePayment' type='date' placeholder='Tanggal Pemesanan' {...register('datePayment', { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='statusPayment'>
                                    Status Pembayaran
                                </label>
                                <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='statusPayment' name='statusPayment' {...register('statusPayment', { required: true })}>
                                    <option defaultValue disabled>Pilih Status Pembayaran</option>
                                    <option value='unpaid'>Belum Lunas</option>
                                    <option value='paid'>Lunas</option>
                                </select>
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='status'>
                                    Status Pengerjaan
                                </label>
                                <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='status' name='status' {...register('status', { required: true })}>
                                    <option defaultValue disabled>Pilih Status Pengerjaan</option>
                                    <option value='pending'>Proses</option>
                                    <option value='done'>Selesai</option>
                                    <option value='canceled'>Dibatalkan</option>
                                </select>
                            </div>
                            {totalPackage > 0 && (
                                Array.from({ length: totalPackage }, (item, index) => {
                                    return (
                                        <div key={item}>
                                            <div className='mt-4'>
                                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='packageId'>
                                                    Paket Jasa #{index + 1}
                                                </label>
                                                <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='packageId' name='packageId' {...register('packageId', { required: true })}>
                                                    <option defaultValue disabled>Pilih Nama Paket Jasa</option>
                                                    {dataPackage.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item._id}>{item.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className='mt-4'>
                                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='quantity'>
                                                    Kuantitas
                                                </label>
                                                <div className='flex items-center justify-center'>
                                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='quantity' name='quantity' type='number' placeholder='Kuantitas' {...register('quantity', { required: true })} />
                                                    <span className='mx-2 text-lg'>Kg</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                            <div className='mt-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='adminId'>
                                    Petugas
                                </label>
                                <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='adminId' name='adminId' {...register('adminId', { required: true })}>
                                    <option defaultValue disabled>Pilih Petugas</option>
                                    {dataAdmin.map((item, index) => {
                                        return (
                                            <option key={index} value={item._id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='mt-4'>
                                <button className='flex items-center justify-center bg-sky-500 hover:bg-sky-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                                    <FaCartPlus className='mr-2' /> Proses Transaksi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
