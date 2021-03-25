import Head from 'next/head'
import Nav from '../components/Nav'
import NavLink from '../components/NavLink'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Nav>
        <NavLink href="riders">Riders</NavLink>
      </Nav>
    </div>
  )
}


export async function getStaticProps() {
  return {
    props: {},
    revalidate: 600
  }
}
