'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Product = {
  id: number
  name: string
  category: string
  price: number
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Classic Logo Tee',
    category: 'Logo Tee',
    price: 150000,
    image: '/products/classic-logo-tee.jpg',
  },
  {
    id: 2,
    name: 'Love Is Dog Tee',
    category: 'Graphic Tee',
    price: 150000,
    image: '/products/love-is-dog-tee.jpg',
  },
  {
    id: 3,
    name: 'Urban Photo Tee',
    category: 'Photo Tee',
    price: 170000,
    image: '/products/urban-photo-tee.jpg',
  },
  {
    id: 4,
    name: 'Simple Logo Tee',
    category: 'Basic Tee',
    price: 140000,
    image: '/products/simple-logo-tee.jpg',
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price)
}

export default function Home() {
  const router = useRouter()

  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [subscribeOpen, setSubscribeOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [currency, setCurrency] = useState('IDR')
  const [language, setLanguage] = useState('ID')

  function openShop() {
    router.push('/shop')
  }

  function openProduct(id: number) {
    router.push(`/product/${id}`)
  }

  function addToCart(product: Product) {
    const oldCart = JSON.parse(
      localStorage.getItem('stg_cart') || '[]'
    )

    const newItem = {
      product,
      size: 'M',
      qty: 1,
    }

    localStorage.setItem(
      'stg_cart',
      JSON.stringify([...oldCart, newItem])
    )

    router.push('/cart')
  }

  return (
    <main className="site">

      {/* ================= HEADER ================= */}

      <header className="header">

        <button
          className="iconButton"
          aria-label="Menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <button
          className="iconButton searchButton"
          aria-label="Search"
          onClick={openShop}
        >
          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </button>

        <button
          className="logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          STENGHILS
        </button>

        <button
          className="iconButton"
          aria-label="Account"
          onClick={() => setAccountOpen(true)}
        >
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
          </svg>
        </button>

        <button
          className="iconButton"
          aria-label="Cart"
          onClick={() => router.push('/cart')}
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 4h2l2 13h11l2-9H6" />
            <circle cx="9" cy="21" r="1.5" />
            <circle cx="17" cy="21" r="1.5" />
          </svg>
        </button>

      </header>


      {/* ================= HERO ================= */}

      <section
        className="hero"
        onClick={openShop}
        role="button"
        tabIndex={0}
      >

        <div className="heroOverlay" />

        <div className="heroContent">

          <div className="heroBrand">
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

          <button
            className="shopButton"
            onClick={(e) => {
              e.stopPropagation()
              openShop()
            }}
          >
            SHOP NOW
          </button>

        </div>

      </section>


      {/* ================= SUBSCRIBE FLOAT ================= */}

      <button
        className="subscribeButton"
        onClick={() => setSubscribeOpen(true)}
      >
        SUBSCRIBE
      </button>


      {/* ================= SHOP PREVIEW ================= */}

      <section className="productsSection" id="products">

        <div className="sectionHeader">
          <div>
            <span>STENGHILS</span>
            <h2>NEW ARRIVALS</h2>
          </div>

          <button
            className="viewAll"
            onClick={openShop}
          >
            VIEW ALL →
          </button>
        </div>


        <div className="productGrid">

          {products.map((product) => (

            <article
              className="productCard"
              key={product.id}
            >

              <button
                className="productImage"
                onClick={() => openProduct(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                />
              </button>

              <div className="productInfo">

                <small>
                  {product.category}
                </small>

                <h3>
                  {product.name}
                </h3>

                <strong>
                  Rp {formatPrice(product.price)}
                </strong>

                <button
                  className="addButton"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* ================= COLLECTION ================= */}

      <section className="collection">

        <div className="collectionText">

          <span>STENGHILS COLLECTION</span>

          <h2>
            MORE THAN
            <br />
            JUST A
            <br />
            T-SHIRT.
          </h2>

          <p>
            Streetwear dengan karakter kuat,
            desain original dan dibuat untuk
            kamu yang berani tampil berbeda.
          </p>

          <button
            className="blackButton"
            onClick={openShop}
          >
            SHOP COLLECTION
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footerLogo">
          STENGHILS
        </div>

        <p>
          MORE THAN JUST A T-SHIRT.
        </p>

        <div className="footerLinks">

          <button onClick={openShop}>
            SHOP
          </button>

          <button onClick={() => setAccountOpen(true)}>
            ACCOUNT
          </button>

          <button onClick={() => setSubscribeOpen(true)}>
            NEWSLETTER
          </button>

        </div>

        <small>
          © 2026 STENGHILS. ALL RIGHTS RESERVED.
        </small>

      </footer>


      {/* ================= SIDE MENU ================= */}

      {menuOpen && (

        <div
          className="drawerBackground"
          onClick={() => setMenuOpen(false)}
        >

          <aside
            className="sideMenu"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="closeButton"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>

            <nav>

              <button
                onClick={() => {
                  setMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                HOME
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false)
                  openShop()
                }}
              >
                SHOP
                <span>›</span>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false)
                  document
                    .querySelector('.collection')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                LOOKBOOKS
              </button>

            </nav>


            <div className="menuBottom">

              <button
                onClick={() => {
                  setLanguageOpen(!languageOpen)
                  setCurrencyOpen(false)
                }}
              >
                LANGUAGE
                <span>{language}⌄</span>
              </button>

              {languageOpen && (

                <div className="choiceBox">

                  <button onClick={() => {
                    setLanguage('ID')
                    setLanguageOpen(false)
                  }}>
                    Bahasa Indonesia
                  </button>

                  <button onClick={() => {
                    setLanguage('EN')
                    setLanguageOpen(false)
                  }}>
                    English
                  </button>

                </div>

              )}


              <button
                onClick={() => {
                  setCurrencyOpen(!currencyOpen)
                  setLanguageOpen(false)
                }}
              >
                CURRENCY
                <span>{currency}⌄</span>
              </button>

              {currencyOpen && (

                <div className="choiceBox">

                  {['IDR', 'USD', 'EUR', 'MYR'].map((item) => (

                    <button
                      key={item}
                      onClick={() => {
                        setCurrency(item)
                        setCurrencyOpen(false)
                      }}
                    >
                      {item}
                    </button>

                  ))}

                </div>

              )}

            </div>

          </aside>

        </div>

      )}


      {/* ================= ACCOUNT ================= */}

      {accountOpen && (

        <div
          className="drawerBackground"
          onClick={() => setAccountOpen(false)}
        >

          <aside
            className="accountDrawer"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="drawerTitle">

              <h2>Account</h2>

              <button
                className="closeButton"
                onClick={() => setAccountOpen(false)}
              >
                ×
              </button>

            </div>

            <button
              className="accountSignIn"
              onClick={() => router.push('/login')}
            >
              SIGN IN
            </button>

            <div className="accountButtons">

              <button
                onClick={() => router.push('/orders')}
              >
                <span>▣</span>
                ORDERS
              </button>

              <button
                onClick={() => router.push('/account')}
              >
                <span>♙</span>
                PROFILE
              </button>

            </div>

          </aside>

        </div>

      )}


      {/* ================= SUBSCRIBE ================= */}

      {subscribeOpen && (

        <div
          className="modalBackground"
          onClick={() => setSubscribeOpen(false)}
        >

          <div
            className="subscribeModal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modalClose"
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
              className="subscribeSubmit"
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
