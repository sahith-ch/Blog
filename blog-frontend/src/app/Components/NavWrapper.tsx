'use client'

import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('./Navbar/Navbar'), { ssr: false })

export default function NavWrapper() {
  return <Navbar />
}