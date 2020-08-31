import Head from 'next/head'
import Nav from '../../components/Nav'
import styles from '../../styles/Home.module.css'

export default function Rider({ rider }) {
  return (
    <div className={styles.container}>
      <Nav rider/>
      <h1>{rider.email}</h1>
    </div>
  )
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3005/riders/')
  const riders = await res.json()

  // Get the paths we want to pre-render based on riders
  const paths = riders.map((rider) => `/riders/${rider.id}`)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts
  const res = await fetch(`http://localhost:3005/riders/${params.rider_id}`)
  const rider = await res.json()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      rider
    }
  }
}
