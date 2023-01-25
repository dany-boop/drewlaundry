import React from 'react'
import bg from '../assets/background.png'
import logo from '../assets/logo.png'


export default function Home() {
    return (
        <div>
            <div className="relative">
                <img
                    src={bg}
                    className="flex absolute inset-0 object-cover object-center"
                    alt="bg-private"
                />
                <section class="relative">
                    <div className=' bg-yellow-500 flex items-center py-2'>
                        <div className='flex items-center'>
                            <p className='sm:text-m font-bold text-center text-black px-64 bg-clip-text '>pengiriman gratis & cepat di atas Rp3125000. tanpa biaya tersembunyi, bayar bea masuk & pajak daerah di muka saat checkout :</p>
                        </div>
                    </div>
                    <div className='text-white body-font px-10'>
                        <div className='container px-5 py-14 mx-auto'>
                            <div className='flex justify-center items-center mx-auto'>
                                <img src={logo}
                                    className=' w-72 h-14 object-center '
                                />
                            </div>
                            <div className='text-center pt-28'>
                                <h1 className='sm:text-3xl text-2xl font-bold text-center title-font text-white bg-clip-text mb-4'>welcome to the Drew House Laundry</h1>
                            </div>
                            <div className='flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 pt-20'>
                                <div className='p-2 sm:w-1/2 w-full'>
                                    <div className='bg-gray-100 rounded flex p-4 h-full items-center'>
                                        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' className='text-yellow-500 w-6 h-6 flex-shrink-0 mr-4' viewBox='0 0 24 24'>
                                            <path d='M22 11.08V12a10 10 0 11-5.93-9.14'></path>
                                            <path d='M22 4L12 14.01l-3-3'></path>
                                        </svg>
                                        <span className='title-font font-medium text-black'>Menggunakan Stack MERN (MongoDB, Express, React.js, Node.js)</span>
                                    </div>
                                </div>
                                <div className='p-2 sm:w-1/2 w-full'>
                                    <div className='bg-gray-100 rounded flex p-4 h-full items-center'>
                                        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' className='text-yellow-500 w-6 h-6 flex-shrink-0 mr-4' viewBox='0 0 24 24'>
                                            <path d='M22 11.08V12a10 10 0 11-5.93-9.14'></path>
                                            <path d='M22 4L12 14.01l-3-3'></path>
                                        </svg>
                                        <span className='title-font font-medium text-black'>Login, dan Logout Karyawan</span>
                                    </div>
                                </div>
                                <div className='p-2 sm:w-1/2 w-full'>
                                    <div className='bg-gray-100 rounded flex p-4 h-full items-center'>
                                        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' className='text-yellow-500 w-6 h-6 flex-shrink-0 mr-4' viewBox='0 0 24 24'>
                                            <path d='M22 11.08V12a10 10 0 11-5.93-9.14'></path>
                                            <path d='M22 4L12 14.01l-3-3'></path>
                                        </svg>
                                        <span className='title-font font-medium text-black'>CRUD Karyawan (Admin)</span>
                                    </div>
                                </div>
                                <div className='p-2 sm:w-1/2 w-full'>
                                    <div className='bg-gray-100 rounded flex p-4 h-full items-center'>
                                        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' className='text-yellow-500 w-6 h-6 flex-shrink-0 mr-4' viewBox='0 0 24 24'>
                                            <path d='M22 11.08V12a10 10 0 11-5.93-9.14'></path>
                                            <path d='M22 4L12 14.01l-3-3'></path>
                                        </svg>
                                        <span className='title-font font-medium text-black'>CRUD Outlet (Admin)</span>
                                    </div>
                                </div>
                                <div className='p-2 sm:w-1/2 w-full'>
                                    <div className='bg-gray-100 rounded flex p-4 h-full items-center'>
                                        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' className='text-yellow-500 w-6 h-6 flex-shrink-0 mr-4' viewBox='0 0 24 24'>
                                            <path d='M22 11.08V12a10 10 0 11-5.93-9.14'></path>
                                            <path d='M22 4L12 14.01l-3-3'></path>
                                        </svg>
                                        <span className='title-font font-medium text-black'>CRUD Tipe Jasa Produk (Admin)</span>
                                    </div>
                                </div>
                                <div className='p-2 sm:w-1/2 w-full'>
                                    <div className='bg-gray-100 rounded flex p-4 h-full items-center'>
                                        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' className='text-yellow-500 w-6 h-6 flex-shrink-0 mr-4' viewBox='0 0 24 24'>
                                            <path d='M22 11.08V12a10 10 0 11-5.93-9.14'></path>
                                            <path d='M22 4L12 14.01l-3-3'></path>
                                        </svg>
                                        <span className='title-font font-medium text-black'>Register Pelanggan</span>
                                    </div>
                                </div>
                                <div className='p-2 sm:w-1/2 w-full'>
                                    <div className='bg-gray-100 rounded flex p-4 h-full items-center'>
                                        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' className='text-yellow-500 w-6 h-6 flex-shrink-0 mr-4' viewBox='0 0 24 24'>
                                            <path d='M22 11.08V12a10 10 0 11-5.93-9.14'></path>
                                            <path d='M22 4L12 14.01l-3-3'></path>
                                        </svg>
                                        <span className='title-font font-medium text-black'>Transaksi</span>
                                    </div>
                                </div>
                                <div className='p-2 sm:w-1/2 w-full'>
                                    <div className='bg-gray-100 rounded flex p-4 h-full items-center'>
                                        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' className='text-yellow-500 w-6 h-6 flex-shrink-0 mr-4' viewBox='0 0 24 24'>
                                            <path d='M22 11.08V12a10 10 0 11-5.93-9.14'></path>
                                            <path d='M22 4L12 14.01l-3-3'></path>
                                        </svg>
                                        <span className='title-font font-medium text-black'>Download Laporan</span>
                                    </div>
                                </div>
                            </div>
                            <button className='flex mx-auto mt-16 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg'>
                                <a href='https://github.com/dany-boop/drewlaundry' target='_blank'>Source Code</a>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    )
}
