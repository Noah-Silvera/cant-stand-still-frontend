import TripCard from '../../../../components/riders/trips/TripCard'
import styles from '../../../../styles/Home.module.css'
import RiderNav from '../../../../components/RiderNav'
import { useRouter } from 'next/router'

export default function Index({ trips, rider }) {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <RiderNav rider={rider}/>
      <div className={"flex flex-wrap -mx-2 mb-8 mt-8"}>
        {trips.map((trip) => {
          return (
            <TripCard
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-8 cursor-pointer"
              onClick={() => router.push({
                pathname: `${router.pathname}/[trip_id]`,
                query: {
                  user_id: rider.user_id,
                  trip_id: trip.id
                }
              })}
              key={trip.id}
              trip={trip} />
          )
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
  const trips_res = await fetch(`${process.env.SERVER_HOST}/riders/${params.user_id}/trips.json`)
  const trips = await trips_res.json()
  const rider = await riders_res.json()
  return {
    props: {
      trips,
      rider
    },
    revalidate: 5
  }
}
