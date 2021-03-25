import Head from 'next/head'
import Nav from '../components/Nav'
import NavLink from '../components/NavLink'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Nav>
        <div className="text-sm lg:flex-grow">
          <NavLink href="riders">Riders</NavLink>
        </div>
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
