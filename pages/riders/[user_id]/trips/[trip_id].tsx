import styles from '../../../../styles/Home.module.css'
import RiderNav from '../../../../components/RiderNav'

export default function Trip({ trip, rider }) {
  return (
    <div className={styles.container}>
      <RiderNav rider={rider}/>
      <div className="flex items-center flex-col my-4">
        <h1 className="text-4xl mb-2">{trip.name}</h1>
        <h2 className="text-2xl">{new Date(trip.start_date).toDateString()} - {trip.end_date ? new Date(trip.end_date).toDateString() : "ongoing"}</h2>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const riders_req = await fetch(`${process.env.SERVER_HOST}/riders/`)
  const riders = await riders_req.json()

  var trip_paths_array = await Promise.all(riders.map(async (rider): Promise<string[]> => {
    const trips_req = await fetch(`${process.env.SERVER_HOST}/riders/${rider.user_id}/trips.json`)

    const trips = await trips_req.json()

    return trips.map((trip) => `/riders/${rider.user_id}/trips/${trip.id}.json`)
  }))

  var paths = trip_paths_array.reduce((all_trip_paths: string[], trip_paths: string[]) => all_trip_paths.concat(trip_paths), [])

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const rider_req = await fetch(`${process.env.SERVER_HOST}/riders/${params.user_id}`)
  const trip_req = await fetch(`${process.env.SERVER_HOST}/riders/${params.user_id}/trips/${params.trip_id}.json`)
  const trip = await trip_req.json()
  const rider = await rider_req.json()

  return {
    props: {
      trip,
      rider
    },
    revalidate: 5
  }
}
