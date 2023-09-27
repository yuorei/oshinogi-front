import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import { notFound } from "next/navigation";
import styles from '@/styles/Politician.module.css'
import styleshome from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import Header from '@/components/header/header'

interface Post {
    id: number,
    userId: number,
    boardId: number,
    content: string,
    plusMinus: number,
    createdAt: string,
    updatedAt: string
}

interface PoliticianInformation {
    id: number,
    name: string,
    description: string,
    imageURL: string,
    level: number,
    createdAt: string,
    updatedAt: string,
}

const getPoliticianPost = async (id: number) => {
    try {
        const res = await fetch(`http://localhost:8000/comments/?politician_id=${id}`);
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
        const res = await fetch(`http://localhost:8000/politicians/${id}`);
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
export default async function Politician() {
    const [post, setPost] = useState('')
    const [like, setLike] = useState('')
    const router = useRouter()
    const id = router.query.id as string

    const save = async (e: React.FormEvent<HTMLFormElement>) => {
        if (null == localStorage.getItem("token")) {
            router.push('/login')
            return
        }

        e.preventDefault()
        let likeNumber = 0
        switch (like) {
            case 'good':
                likeNumber = 1
                break;
            case 'normal':
                likeNumber = 0
                break;
            case 'bad':
                likeNumber = -1
                break;
            default:
                alert('評価をしてください')
                return
        }

        const data = {
            content: post,
            plusMinus: likeNumber,
        }
        try {
            const res = await fetch(`http://localhost:8000//comments/board/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                // サーバーからエラーレスポンスが返された場合の処理
                console.error(`Fetch failed with status ${res.status}`);
                alert('作成に失敗しました')
            } else {
                const json = await res.json();
                console.log(json);
                router.reload()
            }
        } catch (error) {
            // ネットワークエラーやその他の例外が発生した場合の処理
            console.error('Fetch error:', error);
            alert('作成に失敗しました')
        }
    }
    const posts = await getPoliticianPost(Number(id))
    const politicianInformation = await getPoliticianInformation(Number(id))
    return (
        <>
            <Head>
                <title>推しの議</title>
                <meta name="description" content="推しの議" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className={styles.politician_page}>
                <ul className={styles.posts}>
                    <li>
                        <form className={styles.form} onSubmit={save}>
                            <textarea className={styles.post} rows={1} cols={30} value={post} onChange={e => setPost(e.target.value)} placeholder="投稿する" />
                            <select value={like} onChange={e => setLike(e.target.value)}>
                                <option value="good">グッド👍</option>
                                <option value="normal">普通😃</option>
                                <option value="bad">バット👎</option>
                            </select>

                            <button className={styleshome.button} type="submit"  >投稿</button>
                        </form>
                    </li>
                    {posts.map((post) => (
                        <li key={post.id} className={styles.post}>{post.content}</li>
                    ))}
                </ul>
                <div>
                    <Image
                        src={politicianInformation.imageURL}
                        alt={politicianInformation.name}
                        width={500}
                        height={500}
                    />
                    <p className={styleshome.p}>名前: {politicianInformation.name}</p>
                    <p className={styleshome.p}>レベル: {politicianInformation.level}</p>
                    <p className={styleshome.p}>説明: {politicianInformation.description}</p>
                </div>
            </div>
        </>
    )
}