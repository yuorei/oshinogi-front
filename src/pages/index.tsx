import Head from 'next/head'
import Router from 'next/router'
import styles from '@/styles/Home.module.css'
import Header from '@/components/header/header'
import Link from 'next/link';

const politicianList = [
  { id: 1, name: 'User 1', district: '東京都' },
  { id: 2, name: 'User 2', district: '愛知県' },
  { id: 3, name: 'User 3', district: '大阪府' },
];


export default function Home() {
  const buttonAlert = () => {
    Router.push('/politician/new')
  }
  return (
    <>
      <Head>
        <title>推しの議</title>
        <meta name="description" content="推しの議" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main >
        <div className={styles.select}>
          <p className={styles.p}>推しを選んでください</p>
          <button className={styles.button} onClick={buttonAlert}>新たに作る</button>
        </div>
        <ul>
          {politicianList.map((politician) => (
            <Link className={styles.list} href={`/politician/${politician.id}`}>
              <p className={styles.politician}>名前: {politician.name}</p>
              <p className={styles.politician}>地区: {politician.district}</p>
            </Link>
          ))}
        </ul>
      </main>
    </>
  )
}
