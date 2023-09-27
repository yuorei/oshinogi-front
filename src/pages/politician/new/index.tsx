import { useState } from 'react';
import Router from 'next/router'
import Head from 'next/head'
import styles from '@/styles/Login.module.css'
import Header from '@/components/header/header'

export default function FormRegister() {
    const [name, setPoliticianName] = useState('')
    const [description, setPoliticianDescription] = useState('')
    const [imageURL, setImageURL] = useState('')

    const save = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            name: name,
            description: description,
            imageURL: imageURL,
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/politicians/register`, {
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
                Router.push('/')
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
                <div className={styles.font}>追加する人の情報を入力してください</div>
                <div>
                    <label className={styles.font} htmlFor="name">名前</label>
                    <input type="name" name="name" id="name" value={name} onChange={e => setPoliticianName(e.target.value)} />
                </div>
                <div>
                    <label className={styles.font} htmlFor="description">説明</label>
                    <input type="description" name="description" id="description" value={description} onChange={e => setPoliticianDescription(e.target.value)} />
                </div>
                <div>
                    <label className={styles.font} htmlFor="image_url">画像URL</label>
                    <input type="image_url" name="image_url" id="image_url" value={imageURL} onChange={e => setImageURL(e.target.value)} />
                </div>
                <button className={styles.login_button} type="submit">作成</button>
            </form>
        </>
    )
}
