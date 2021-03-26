import { useRouter } from 'next/router'

export default function TripCard({ trip, className = "", onClick = null }) {
  const router = useRouter()

  return (
    <div className={className} onClick={onClick} >
      <div className="flex items-center my-2 mx-8 py-2 bg-white hover:bg-gray-200 rounded-3xl flex-row justify-center">
        {trip.name}
       </div>
    </div>
  )
}
