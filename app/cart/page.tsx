'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabaseBrowser } from '../../lib/supabase'

export default function Cart() {
  const [cart, setCart] = useState<any[]>([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem('stg_cart') || '[]'))
    } catch {
      setCart([])
    }
  }, [])

  const total = cart.reduce(
    (a, x) => a + x.product.price * x.qty,
    0
  )

  async function checkout() {
    setMsg('Memproses pesanan...')

    const supabase = supabaseBrowser()

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError) {
      alert('Gagal memeriksa login: ' + userError.message)
      setMsg('')
      return
    }

    if (!user) {
      alert('Silakan login terlebih dahulu.')
      window.location.href = '/login'
      return
    }

    if (!cart.length) {
      alert('Keranjang masih kosong.')
      return
    }

    const { error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total: total,
        status: 'received',
        payment_method: 'manual'
      })

    if (error) {
      alert('Pesanan gagal dibuat:\n\n' + error.message)
      setMsg('')
      return
    }

    localStorage.removeItem('stg_cart')
    setCart([])
    setMsg('Pesanan berhasil dibuat!')

    alert('Pesanan berhasil dibuat!')
  }

  return (
    <main className="section">
      <div className="wrap">
        <Link href="/">← Belanja lagi</Link>

        <h1>Keranjang</h1>

        {cart.map((x, i) => (
          <div
            className="panel"
            key={i}
            style={{ margin: '10px 0' }}
          >
            <b>{x.product.name}</b> · Size {x.size} · {x.qty} pcs
            <br />
            Rp {(x.product.price * x.qty).toLocaleString('id-ID')}
          </div>
        ))}

        <h2>
          Total Rp {total.toLocaleString('id-ID')}
        </h2>

        <button
          className="btn"
          onClick={checkout}
        >
          BUAT PESANAN
        </button>

        <p className="success">{msg}</p>
      </div>
    </main>
  )
}
