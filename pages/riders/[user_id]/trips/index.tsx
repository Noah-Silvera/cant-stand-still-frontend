import styles from '../../../../styles/Home.module.css'
import RiderNav from '../../RiderNav'

export default function Index({ trips, rider }) {
  return (
    <div className={styles.container}>
      <RiderNav rider={rider}/>
      <div>
        {trips.map((trip) => {
          return <p>Trip: {trip.name}</p>
        })}
      </div>
    </div>
  )
}

export async function getStaticPaths(args) {
  // Call an external API endpoint to get trips
  const riders_res = await fetch(`${process.env.SERVER_HOST}/riders/`)
  const riders: Array<any> = await riders_res.json()

  const paths: string[] = riders.map((rider) => `/riders/${rider.user_id}/trips`)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
  const riders_res = await fetch(`${process.env.SERVER_HOST}/riders/${params.user_id}`)
  const trips_res = await fetch(`${process.env.SERVER_HOST}/riders/${params.user_id}/trips`)
  const trips = await trips_res.json()
  const rider = await riders_res.json()
  return {
    props: {
      trips,
      rider
    }
  }
}
