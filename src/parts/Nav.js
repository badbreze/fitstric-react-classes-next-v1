import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav>
        <Link href={'/home'}>Home</Link> - 
        <Link href={'/animali'}>Animali</Link> - 
        <Link href={'/padroni'}>Padroni</Link>
    </nav>
  )
}

export default Nav