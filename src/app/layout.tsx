import '@/_styles/globals.css'
import type { Metadata } from 'next'
import { Raleway as Font } from 'next/font/google'
import Header from '@/_components/Navigation/header'
const font = Font({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather',
  description: 'Crafted with Love by iamkrarun',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='w-full' style={font.style}>
        <div className='mx-auto max-w-[900px]'>
        <Header/>
        {children}
        </div>
        </body>
    </html>
  )
}
