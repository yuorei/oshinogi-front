import Head from 'next/head'
import Router from 'next/router'
import { notFound } from "next/navigation";
import styles from '@/styles/Home.module.css'
import Header from '@/components/header/header'
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Politician {
  id: number;
  name: string;
  description: string;
  level: number;
  imageURL: string;
}

// TODO feachで取得したデータを表示する場合はasync awaitを使う
export default function Home() {
  const [politicians, setPoliticians] = useState<Politician[]>([])
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8000/politicians/`);
      const data = await res.json();
      setPoliticians(data.politicians);
    })()
  }, [])
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
          <button className={styles.button} onClick={buttonAlert}>政治家を追加する</button>
        </div>
        <ul>
          {politicians.map((politician) => (
            <Link key={politician.id} className={styles.list} href={`/politician/${politician.id}`}>
              <p className={styles.politician}>名前: {politician.name}</p>
              <p className={styles.politician}>地区: {politician.description}</p>
            </Link>
          ))}
        </ul>
      </main>
    </>
  )
}
