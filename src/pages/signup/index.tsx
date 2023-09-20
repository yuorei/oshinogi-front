import { useState } from 'react';
import Router from 'next/router'
import Head from 'next/head'
import styles from '@/styles/Login.module.css'
import Header from '@/components/header/header'

export default function Form() {
    const [name, setUserName] = useState('')
    const [email, setUserEmail] = useState('')
    const [password, setPassword] = useState('')

    const save = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            name: name,
            email: email,
            password: password
        }
        try {
            const res = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                Router.push('/login')
            }
        } catch (error) {
            // ネットワークエラーやその他の例外が発生した場合の処理
            console.error('Fetch error:', error);
            alert('作成に失敗しました')
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

            <form className={styles.form} onSubmit={save}>
                <div>
                    <label htmlFor="name">名前</label>
                    <input type="name" name="name" id="name" value={name} onChange={e => setUserName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">メールアドレス</label>
                    <input type="email" name="email" id="email" value={email} onChange={e => setUserEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">パスワード</label>
                    <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button className={styles.login_button} type="submit">作成</button>
            </form>
        </>
    )
}
