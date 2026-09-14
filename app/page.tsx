'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [menu, setMenu] = useState(false)
  const [account, setAccount] = useState(false)
  const [language, setLanguage] = useState(false)
  const [currency, setCurrency] = useState(false)
  const [subscribe, setSubscribe] = useState(false)

  return (
    <main className="home">

      {/* HEADER */}
      <header className="home-header">

        <button
          className="icon-button"
          onClick={() => setMenu(true)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <button className="icon-button" aria-label="Search">
          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
        </button>

        <Link href="/" className="logo">
          STENGHILS
        </Link>

        <button
          className="icon-button"
          onClick={() => setAccount(true)}
          aria-label="Account"
        >
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" />
            <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
          </svg>
        </button>

        <Link href="/cart" className="icon-button" aria-label="Cart">
          <svg viewBox="0 0 24 24">
            <path d="M3 5h2l2 12h11l2-9H6" />
            <circle cx="9" cy="21" r="1.5" />
            <circle cx="18" cy="21" r="1.5" />
          </svg>
        </Link>

      </header>


      {/* HERO */}
      <section
        className="hero"
        onClick={() => {
          window.location.href = '/shop'
        }}
      >

        {/* GANTI /hero.jpg DENGAN FOTO HERO KAMU */}
        <img
          src="/hero.jpg"
          alt="STENGHILS Black Capsule"
          className="hero-image"
        />

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <div className="hero-small">
            STENGHILS
          </div>

          <h1>
            BLACK
            <br />
            CAPSULE
          </h1>

          <p>
            ONLINE RELEASE · 12.09.26
          </p>

          <Link
            href="/shop"
            className="shop-button"
            onClick={(e) => e.stopPropagation()}
          >
            SHOP NOW
          </Link>

        </div>

      </section>


      {/* SUBSCRIBE */}
      <button
        className="subscribe-button"
        onClick={() => setSubscribe(true)}
      >
        SUBSCRIBE
      </button>


      {/* CURRENCY */}
      <div className="currency-box">

        <button
          className="currency-current"
          onClick={() => setCurrency(!currency)}
        >
          🇮🇩
          <span>IDR</span>
          <span>{currency ? '⌃' : '⌄'}</span>
        </button>

        {currency && (
          <div className="currency-menu">

            <button onClick={() => setCurrency(false)}>
              🇺🇸 US Dollar (USD)
            </button>

            <button onClick={() => setCurrency(false)}>
              🇪🇺 Euro (EUR)
            </button>

            <button onClick={() => setCurrency(false)}>
              🇲🇾 Malaysian Ringgit (MYR)
            </button>

            <button onClick={() => setCurrency(false)}>
              🇮🇩 Indonesian Rupiah (IDR)
            </button>

          </div>
        )}

      </div>


      {/* LANGUAGE */}
      <div className="language-box">

        <button
          className="language-current"
          onClick={() => setLanguage(!language)}
        >
          🌐 ID
          <span>{language ? '⌃' : '⌄'}</span>
        </button>

        {language && (
          <div className="language-menu">

            <button onClick={() => setLanguage(false)}>
              🇮🇩 Bahasa Indonesia
            </button>

            <button onClick={() => setLanguage(false)}>
              🇬🇧 English
            </button>

          </div>
        )}

      </div>


      {/* SIDE MENU */}
      {menu && (
        <div className="drawer">

          <button
            className="close-button"
            onClick={() => setMenu(false)}
          >
            ×
          </button>

          <nav>

            <Link href="/" onClick={() => setMenu(false)}>
              HOME
            </Link>

            <Link href="/shop" onClick={() => setMenu(false)}>
              SHOP
            </Link>

            <Link href="/lookbooks" onClick={() => setMenu(false)}>
              LOOKBOOKS
            </Link>

          </nav>

        </div>
      )}


      {/* ACCOUNT */}
      {account && (
        <div className="bottom-panel">

          <div className="panel-title">
            Account

            <button onClick={() => setAccount(false)}>
              ×
            </button>
          </div>

          <Link
            href="/login"
            className="account-login"
          >
            Sign in
          </Link>

          <div className="account-grid">

            <Link href="/account">
              ♧ Orders
            </Link>

            <Link href="/account">
              ♙ Profile
            </Link>

          </div>

        </div>
      )}


      {/* SUBSCRIBE MODAL */}
      {subscribe && (
        <div className="modal-background">

          <div className="subscribe-modal">

            <button
              className="modal-close"
              onClick={() => setSubscribe(false)}
            >
              ×
            </button>

            <h2>Subscribe</h2>

            <p>
              Complete the form to subscribe.
            </p>

            <input
              type="email"
              placeholder="Email"
            />

            <button className="submit-button">
              Submit
            </button>

            <small>
              By signing up, you agree to receive marketing emails.
            </small>

          </div>

        </div>
      )}

    </main>
  )
}
