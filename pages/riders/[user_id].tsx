import styles from '../../styles/Home.module.css'
import RiderNav from '../../components/RiderNav'

export default function Rider({ rider }) {
  return (
    <div className={styles.container}>
      <RiderNav rider={rider}/>
      <h1 className="rider-info">{rider.first_name} {rider.last_name}</h1>
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
    },
    revalidate: 5
  }
}
