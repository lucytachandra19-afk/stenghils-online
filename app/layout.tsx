import './globals.css'

export const metadata = {
  title: 'STENGHILS Online Store',
  description: 'STENGHILS Online Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
