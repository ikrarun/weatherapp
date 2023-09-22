import '@/_styles/globals.css'
import type { Metadata } from 'next'
import { Outfit as Font } from 'next/font/google'
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
      <body className='w-full bg-black' style={font.style}>
        <div className='flex flex-col w-full' style={{height:'100dvh'}}>

        <Header/>
        <div className='mx-auto flex flex-col grow w-full h-full max-w-[900px] px-4'>
        {children}
        </div>
        </div>
        </body>
    </html>
  )
}
