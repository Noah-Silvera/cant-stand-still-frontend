import RootNav from '../components/RootNav'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <RootNav/>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 600
  }
}
