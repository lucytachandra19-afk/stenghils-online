'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="home">

      {/* HEADER */}
      <header className="header">

        <button className="icon-btn" aria-label="Menu">
          ☰
        </button>

        <Link href="/shop" className="icon-btn" aria-label="Search">
          ⌕
        </Link>

        <Link href="/" className="logo">
          STENGHILS
        </Link>

        <Link href="/account" className="icon-btn" aria-label="Account">
          ♙
        </Link>

        <Link href="/cart" className="icon-btn" aria-label="Cart">
          ♧
        </Link>

      </header>


      {/* HERO */}
      <Link href="/shop" className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <div className="hero-brand">
            STENGHILS
          </div>

          <h1>
            BLACK
            <br />
            CAPSULE
          </h1>

          <div className="hero-date">
            ONLINE RELEASE · 12.09.26
          </div>

        </div>

      </Link>

    </main>
  )
}
