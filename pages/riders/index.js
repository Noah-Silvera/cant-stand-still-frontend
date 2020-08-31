import Head from 'next/head'
import Nav from '../../components/Nav'
import styles from '../../styles/Home.module.css'

export default function Index({ riders }) {
  return (
    <div className={styles.container}>
      <Nav/>
      <div>
        {riders.map((rider) => {
          return <p>Rider: {rider.email}</p>
        })}
      </div>
    </div>
  )
}



export async function getStaticProps() {
  const res = await fetch('http://localhost:3005/riders/')
  const riders = await res.json()
  return {
    props: {
      riders
    }
  }
}
