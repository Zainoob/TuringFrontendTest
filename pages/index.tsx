import Head from 'next/head'
import Login from '../components/auth/login'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Frontend Test by Zainab</title>
        <meta name="description" content="i tried" />
      </Head>
      <Login/>
    </>
  )
}
