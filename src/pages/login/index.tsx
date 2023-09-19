import { useState } from 'react';
import Head from 'next/head'
// import styles from '@/styles/Login.module.css'
import Header from '@/components/header/header'
import Link from 'next/link';


export default function Form() {
    const [email, setUserEmail] = useState('')
    const [password, setPassword] = useState('')

    const save = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('save')
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
        try {
            const res = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                // サーバーからエラーレスポンスが返された場合の処理
                console.error(`Fetch failed with status ${res.status}`);
                // ここで必要なエラーハンドリングを行うことができます
            } else {
                const json = await res.json();
                console.log(json);
                // 成功した場合の処理をここに記述
            }
        } catch (error) {
            // ネットワークエラーやその他の例外が発生した場合の処理
            console.error('Fetch error:', error);
        }
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

            <form onSubmit={save}>
                <div>
                    <label htmlFor="email">メールアドレス</label>
                    <input type="email" name="email" id="email" value={email} onChange={e => setUserEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">パスワード</label>
                    <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">ログイン</button>
            </form>

            <div>
                <Link href="/signup">
                    新規登録はこちらから
                </Link>
            </div>
        </>
    )
}
