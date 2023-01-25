import React from 'react'
import { Link } from 'react-router-dom'

import { Navbar } from '../components'

export default function NotFound() {
    return (
        <div className='bg-gray-900 min-h-screen'>
            <Navbar />
            <section>
                <div className='container'>
                    <div className='py-32'>
                        <div className='flex flex-wrap'>
                            <div className='w-full px-10 lg:w-1/2'>
                                <div className="mx-auto mb-10 flex flex-col items-center justify-center">
                                    <span className="mx-auto mb-5 flex items-center justify-center text-slate-100 xl:mb-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            className="text-coolGray-600 h-40 w-40"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
                                            ></path>
                                            <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                                            <polygon
                                                fill="currentColor"
                                                points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
                                            ></polygon>
                                            <polygon
                                                fill="currentColor"
                                                points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
                                            ></polygon>
                                        </svg>
                                    </span>
                                    <h1 className="hidden text-center text-6xl font-extrabold text-slate-100 md:block md:px-10 md:text-8xl">
                                        404
                                    </h1>
                                </div>
                            </div>
                            <div className="w-full px-4 lg:w-1/2">
                                <div className='text-white'>
                                    <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
                                        Maaf kami tidak dapat menemukan halaman ini.
                                    </p>
                                    <p className="mb-8">
                                        Tapi jangan khawatir, Anda dapat menemukan banyak hal lain di beranda kami.
                                    </p>
                                </div>
                                <Link to="/">
                                    <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:opacity-90 hover:shadow-lg focus:outline-none">
                                        Kembali ke beranda
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
