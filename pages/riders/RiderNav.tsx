import { useRouter } from 'next/router'
import Nav from '../../components/Nav'
import NavLink from '../../components/NavLink'

export default function RiderNav({ rider }){
  const router = useRouter()

  return (
    <Nav>
      <NavLink onClick={() => router.push(`/riders/${rider.user_id}/trips`)} >Trips</NavLink>
      <NavLink onClick={() => router.push(`/riders/${rider.user_id}/stats`)} >Stats</NavLink>
    </Nav>
  )
}
