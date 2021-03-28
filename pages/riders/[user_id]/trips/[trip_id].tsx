import styles from '../../../../styles/Home.module.css'
import RiderNav from '../../../../components/RiderNav'
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../../../components/Map"), {
  ssr: false
});

export default function Trip({ trip, rider, rides }) {
  return (
    <div className={styles.container}>
      <RiderNav rider={rider}/>
      <div className="flex items-center flex-col my-4">
        <h1 className="text-4xl mb-2">{trip.name}</h1>
        <h2 className="text-2xl">{new Date(trip.start_date).toDateString()} - {trip.end_date ? new Date(trip.end_date).toDateString() : "ongoing"}</h2>
      </div>
      <Map rides={rides}/>
    </div>
  )
}

export async function getStaticPaths() {
  const riders_req = await fetch(`${process.env.SERVER_HOST}/riders/`)
  const riders = await riders_req.json()

  var trip_paths_array = await Promise.all(riders.map(async (rider): Promise<string[]> => {
    const trips_req = await fetch(`${process.env.SERVER_HOST}/riders/${rider.user_id}/trips.json`)

    const trips = await trips_req.json()

    return trips.map((trip) => `/riders/${rider.user_id}/trips/${trip.id}`)
  }))

  var paths = trip_paths_array.reduce((all_trip_paths: string[], trip_paths: string[]) => all_trip_paths.concat(trip_paths), [])

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const rider_req = await fetch(`${process.env.SERVER_HOST}/riders/${params.user_id}`)
  const trip_req = await fetch(`${process.env.SERVER_HOST}/riders/${params.user_id}/trips/${params.trip_id}.json`)

  const rides_req = await fetch(`${process.env.SERVER_HOST}/riders/${params.user_id}/trips/${params.trip_id}/rides.json`)


  const [trip, rider, rides] = await Promise.all([
    trip_req.json(),
    rider_req.json(),
    rides_req.json()
  ])

  return {
    props: {
      trip,
      rider,
      rides
    },
    revalidate: 5
  }
}
