'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [subscribeOpen, setSubscribeOpen] = useState(false)
  const [currency, setCurrency] = useState('IDR')

  const currencies = [
    { code: 'USD', name: 'US Dollar (USD)', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro (EUR)', flag: '🇪🇺' },
    { code: 'MYR', name: 'Malaysian Ringgit (MYR)', flag: '🇲🇾' },
    { code: 'IDR', name: 'Indonesian Rupiah (IDR)', flag: '🇮🇩' },
  ]

  return (
    <main className="home">

      {/* HEADER */}
      <header className="site-header">

        <button
          className="icon-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Menu"
        >
          ☰
        </button>

        <button className="icon-btn" aria-label="Search">
          ⌕
        </button>

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
      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="hero-small">
            STENGHILS
          </p>

          <h1>
            BLACK<br />
            CAPSULE
          </h1>

          <p className="hero-date">
            ONLINE RELEASE · 12.09.26
          </p>

          <Link href="/shop" className="hero-button">
            SHOP NOW
          </Link>
        </div>

      </section>

      {/* SIDE MENU */}
      {menuOpen && (
        <div className="menu-overlay">

          <div className="side-menu">

            <button
              className="close-btn"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>

            <nav>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
              >
                HOME
              </Link>

              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
              >
                SHOP
                <span>›</span>
              </Link>

              <Link
                href="/lookbooks"
                onClick={() => setMenuOpen(false)}
              >
                LOOKBOOKS
              </Link>
            </nav>

            {/* CURRENCY */}
            <div className="currency-box">

              <button
                className="currency-current"
                onClick={() =>
                  setCurrencyOpen(!currencyOpen)
                }
              >
                <span>🇮🇩</span>
                <b>{currency}</b>
                <span>
                  {currencyOpen ? '⌃' : '⌄'}
                </span>
              </button>

              {currencyOpen && (
                <div className="currency-list">

                  <div className="currency-title">
                    Currency
                  </div>

                  {currencies.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setCurrency(item.code)
                        setCurrencyOpen(false)
                      }}
                    >
                      <span>{item.flag}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}

                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* SUBSCRIBE BUTTON */}
      <button
        className="subscribe-button"
        onClick={() => setSubscribeOpen(true)}
      >
        SUBSCRIBE
      </button>

      {/* SUBSCRIBE POPUP */}
      {subscribeOpen && (
        <div className="subscribe-overlay">

          <div className="subscribe-modal">

            <button
              className="subscribe-close"
              onClick={() => setSubscribeOpen(false)}
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

            <button
              className="subscribe-submit"
              onClick={() => setSubscribeOpen(false)}
            >
              Submit
            </button>

            <small>
              By signing up, you agree to receive
              marketing emails.
            </small>

          </div>

        </div>
      )}

    </main>
  )
}
