import { useRouter } from 'next/router'
import NavArrow from '../../components/NavArrow'
import NavLink from '../../components/NavLink'
import NavSeparator from '../../components/NavSeparator'
import RootNav from '../../components/RootNav'

export default function RiderNav({ rider }){
  const router = useRouter()

  return (
    <RootNav>
      <NavArrow/>
      <NavLink onClick={() => router.push(`/riders/${rider.user_id}`)} is_active_path={`/riders/${rider.user_id}`} className="italic">{rider.first_name} {rider.last_name}</NavLink>
      <NavSeparator/>
      <NavLink onClick={() => router.push(`/riders/${rider.user_id}/trips`)} is_active_path={`/riders/${rider.user_id}/trips`} >Trips</NavLink>
      <NavLink onClick={() => router.push(`/riders/${rider.user_id}/stats`)} is_active_path={`/riders/${rider.user_id}/stats`}>Stats</NavLink>
    </RootNav>
  )
}
