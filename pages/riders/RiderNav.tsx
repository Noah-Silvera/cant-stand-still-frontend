import { useRouter } from 'next/router'
import Nav from '../../components/Nav'

export default function RiderNav({ rider }){
  const router = useRouter()

  return (
    <Nav>
      <div className="text-sm lg:flex-grow">
        <a onClick={() => router.push(`/riders/${rider.user_id}/trips`)} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Trips
        </a>
        <a onClick={() => router.push(`/riders/${rider.user_id}/stats`)} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Stats
        </a>
      </div>
    </Nav>
  )
}
