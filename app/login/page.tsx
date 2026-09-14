'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function go(e: any) {
    e.preventDefault()

    if (loading) return

    setMsg('')
    setLoading(true)

    try {
      const s = supabaseBrowser()

      if (mode === 'login') {
        const { error } = await s.auth.signInWithPassword({
          email: email.trim(),
          password: pass,
        })

        if (error) {
          setMsg('Login gagal: ' + error.message)
          alert('Login gagal: ' + error.message)
          setLoading(false)
          return
        }

        setMsg('Login berhasil. Mengalihkan...')
        router.push('/account')
        router.refresh()
        return
      }

      const { data, error } = await s.auth.signUp({
        email: email.trim(),
        password: pass,
        options: {
          data: {
            full_name: name.trim(),
          },
        },
      })

      if (error) {
        setMsg('Pendaftaran gagal: ' + error.message)
        alert('Pendaftaran gagal: ' + error.message)
        setLoading(false)
        return
      }

      if (data.session) {
        setMsg('Akun berhasil dibuat.')
        router.push('/account')
        router.refresh()
      } else {
        setMsg('Akun berhasil dibuat. Silakan cek email untuk konfirmasi.')
        alert('Akun berhasil dibuat. Silakan cek email untuk konfirmasi.')
        setLoading(false)
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || 'Terjadi kesalahan yang tidak diketahui.'

      setMsg('Terjadi kesalahan: ' + errorMessage)
      alert('Terjadi kesalahan: ' + errorMessage)
      setLoading(false)
    }
  }

  return (
    <main className="section">
      <div className="wrap">
        <div
          className="panel"
          style={{
            maxWidth: 500,
            margin: 'auto',
          }}
        >
          <div className="brand">STENGHILS</div>

          <h1>{mode === 'login' ? 'Login' : 'Daftar'}</h1>

          <form className="form" onSubmit={go}>
            {mode === 'register' && (
              <input
                required
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              required
              minLength={8}
              type="password"
              placeholder="Password minimal 8 karakter"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />

            <button className="btn" type="submit" disabled={loading}>
              {loading
                ? 'MEMPROSES...'
                : mode === 'login'
                  ? 'MASUK'
                  : 'BUAT AKUN'}
            </button>
          </form>

          {msg && (
            <p
              style={{
                marginTop: 16,
                padding: 12,
                borderRadius: 8,
                background: '#f2f2f2',
                color: '#111',
                wordBreak: 'break-word',
              }}
            >
              {msg}
            </p>
          )}

          <button
            type="button"
            className="btn out"
            onClick={() => {
              setMsg('')
              setMode(mode === 'login' ? 'register' : 'login')
            }}
            disabled={loading}
          >
            {mode === 'login'
              ? 'Daftar akun baru'
              : 'Sudah punya akun? Login'}
          </button>
        </div>
      </div>
    </main>
  )
}
