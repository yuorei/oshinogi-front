import Link from 'next/link'
import styles from './header.module.css'

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">
                    推しの議
                </Link>
            </div>
            <Link href="/login">
                ログイン
            </Link>
        </div>
    )
}

export default Header