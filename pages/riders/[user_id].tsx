import styles from '../../styles/Home.module.css'
import RiderNav from './RiderNav'

export default function Rider({ rider }) {
  return (
    <div className={styles.container}>
      <RiderNav rider={rider}/>
      <h1>{rider.user_id}</h1>
    </div>
  )
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.SERVER_HOST}/riders/`)
  const riders = await res.json()

  // Get the paths we want to pre-render based on riders
  const paths = riders.map((rider) => `/riders/${rider.user_id}`)

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.SERVER_HOST}/riders/${params.user_id}`)
  const rider = await res.json()

  return {
    props: {
      rider
    }
  }
}
