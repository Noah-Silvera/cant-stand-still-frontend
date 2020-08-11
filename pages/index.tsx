import Head from 'next/head'
import Nav from '../components/Nav'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BikesBikesBikes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav/>
    </div>
  )
}
