import Head from 'next/head'
import Nav from '../../../../components/Nav'
import styles from '../../../../styles/Home.module.css'

export default function Trip({ trip, rider}) {
  return (
    <div className={styles.container}>
      <Nav rider />
      <h1>{trip.name}</h1>
    </div>
  )
}

// This function gets called at build time
export async function getStaticPaths(args) {
  // Call an external API endpoint to get trips
  const riders_res = await fetch(`${process.env.SERVER_HOST}/riders/`)
  const riders: Array<any> = await riders_res.json()

  const path_arrays = await Promise.all(riders.map(async (rider): Promise<string[]> => {
    const trips_res = await fetch(`${process.env.SERVER_HOST}/riders/${rider.id}/trips`)
    const trips = await trips_res.json()

    // Get the paths we want to pre-render based on trips
    return trips.map((trip) => {
      return {
        params: {
          user_id: `${rider.id}`,
          trip_id: `${trip.id}`
        }
      }
    })
  }))


  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: path_arrays.flat(), fallback: false }
}

export async function getStaticProps({ params }) {

  // Call an external API endpoint to get posts
  const rider_res = await fetch((`${process.env.SERVER_HOST}/riders/${params.user_id}`))
  const trips_res = await fetch((`${process.env.SERVER_HOST}/riders/${params.user_id}/trips/${params.trip_id}`))
  const trip = await trips_res.json()
  const rider = await rider_res.json()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      trip,
      rider
    }
  }
}
