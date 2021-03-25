import Head from 'next/head'
import Nav from '../components/Nav'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Nav>
        <div className="text-sm lg:flex-grow">
          <a href="riders" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" >Riders</a>
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
