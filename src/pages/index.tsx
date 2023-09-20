import Head from 'next/head'
import Router from 'next/router'
import { notFound } from "next/navigation";
import styles from '@/styles/Home.module.css'
import Header from '@/components/header/header'
import Link from 'next/link';

const politicianList = [
  { id: 1, name: 'User 1', district: '東京都' },
  { id: 2, name: 'User 2', district: '愛知県' },
  { id: 3, name: 'User 3', district: '大阪府' },
];
// interface Politician {
//   id: number;
//   name: string;
//   district: string;
// }

// const getPoliticians = async () => {
//   try {
//     const res = await fetch(`http://localhost:8080/politician/`);
//     if (res.status === 404) {
//       notFound();
//     }
//     if (!res.ok) {
//       throw new Error("Failed to fetch politician");
//     }
//     const data = await res.json();

//     return data as Politician[];
//   } catch (error) {
//     // エラーハンドリングのコードをここに追加
//     console.error("An error occurred:", error);
//   }
// }

// TODO feachで取得したデータを表示する場合はasync awaitを使う
export default function Home() {
  // const politicianList = await getPoliticians()
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
