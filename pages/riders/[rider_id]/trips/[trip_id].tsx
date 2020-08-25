import Head from 'next/head'
import Nav from '../../../../components/Nav'
import styles from '../../../../styles/Home.module.css'

export default function Trip({ trip }) {
  return (
    <div className={styles.container}>
      <Nav />
      <h1>{trip.name}</h1>
    </div>
  )
}

// This function gets called at build time
export async function getStaticPaths(args) {
  // Call an external API endpoint to get trips
  const riders_res = await fetch(`http://localhost:3000/riders/`)
  const riders: Array<any> = await riders_res.json()

  const path_arrays = await Promise.all(riders.map(async (rider): Promise<string[]> => {
    const trips_res = await fetch(`http://localhost:3000/riders/${rider.id}/trips`)
    const trips = await trips_res.json()

    // Get the paths we want to pre-render based on trips
    return trips.map((trip) => {
      return {
        params: {
          rider_id: `${rider.id}`,
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
  const res = await fetch((`http://localhost:3000/riders/${params.rider_id}/trips/${params.trip_id}`))
  const trip = await res.json()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      trip
    }
  }
}
