import Head from 'next/head'
import Nav from '../../../../components/Nav'
import styles from '../../../../styles/Home.module.css'

export default function Index({ trips }) {
  return (
    <div className={styles.container}>
      <Nav/>
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
  const riders_res = await fetch(`http://localhost:3005/riders/`)
  const riders: Array<any> = await riders_res.json()

  // Get the paths we want to pre-render based on trips
  const paths = riders.map((rider) => {
    return {
      params: {
        rider_id: `${rider.id}`,
      }
    }
  })

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}


export async function getStaticProps(params) {
  const res = await fetch(`http://localhost:3005/riders/${params.rider_id}/trips`)
  const trips = await res.json()
  return {
    props: {
      trips
    }
  }
}
