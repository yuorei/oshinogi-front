import Head from 'next/head'
import Image from 'next/image'
import { notFound } from "next/navigation";
import styles from '@/styles/Politician.module.css'
import { useRouter } from 'next/router'

interface Post {
    id: number;
    post: string;
}

interface PoliticianInformation {
    name: string;
    age: number;
    level: number;
    imageURL: string;
}

// TODO バックエンド実装後に消す
const posts = [
    {
        id: 1,
        post: '参議院議員',
    }
]

// TODO バックエンド実装後に消す
const politicianInformation = {
    name: 'やまださん',
    age: 30,
    level: 1,
    imageURL: 'https://hackmd.io/_uploads/H1x4vLvRn.jpg',
}

const getPoliticianPost = async (id: number) => {
    try {
        const res = await fetch(`http://localhost:8080/politician/post/${id}`);
        if (res.status === 404) {
            notFound();
        }
        if (!res.ok) {
            throw new Error("Failed to fetch politician");
        }
        const data = await res.json();

        return data as Post[];
    } catch (error) {
        // エラーハンドリングのコードをここに追加
        console.error("An error occurred:", error);
    }
}

const getPoliticianInformation = async (id: number) => {
    try {
        const res = await fetch(`http://localhost:8080/politician/${id}`);
        if (res.status === 404) {
            notFound();
        }
        if (!res.ok) {
            throw new Error("Failed to fetch politician");
        }
        const data = await res.json();

        return data as PoliticianInformation;
    } catch (error) {
        // エラーハンドリングのコードをここに追加
        console.error("An error occurred:", error);
    }
}

// TODO feachで取得したデータを表示する場合はasync awaitを使う
export default function Politician() {
    const router = useRouter()
    const id = router.query.id;
    // const posts = await getPoliticianPost(id)
    // const politicianInformation = await getPoliticianInformation(id)
    return (
        <>
            <Head>
                <title>推しの議</title>
                <meta name="description" content="推しの議" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.politician_page}>
                <div className={styles.post}>
                    {posts.map((post) => (
                        <p key={post.id} className={styles.politician_page}>{post.post}</p>
                    ))}
                </div>
                <div>
                    <Image
                        src={politicianInformation.imageURL}
                        alt={politicianInformation.name}
                        width={500}
                        height={500}
                    />
                    <p>名前: {politicianInformation.name}</p>
                    <p>レベル: {politicianInformation.level}</p>
                    <p>年齢: {politicianInformation.age}</p>
                </div>
            </div>
        </>
    )
}