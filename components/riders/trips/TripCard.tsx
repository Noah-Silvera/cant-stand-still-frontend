import { useRouter } from 'next/router'

export default function TripCard({ trip, className = "", onClick = null }) {
  const router = useRouter()

  return (
    <div className={className} onClick={onClick} >
      <div className="flex items-center my-2 mx-8 py-2 bg-white hover:bg-gray-200 rounded-3xl flex-col justify-center">
        <p>{trip.name}</p>
        <p>{new Date(trip.start_date).toDateString()} - {trip.end_date ? new Date(trip.end_date).toDateString() : "ongoing"}</p>
       </div>
    </div>
  )
}
