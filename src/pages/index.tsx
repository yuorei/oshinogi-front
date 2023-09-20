import Head from 'next/head'
// import styles from '@/styles/Home.module.css'
import Header from '@/components/header/header'


export default function Home() {
  return (
    <>
      <Head>
        <title>推しの議</title>
        <meta name="description" content="推しの議" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <Header />
      </main>
    </>
  )
}
