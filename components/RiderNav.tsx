import { useRouter } from 'next/router'
import NavArrow from './NavArrow'
import NavLink from './NavLink'
import NavSeparator from './NavSeparator'
import RootNav from './RootNav'

export default function RiderNav({ rider }){
  const router = useRouter()

  return (
    <RootNav>
      <NavArrow/>
      <NavLink onClick={() => router.push(`/riders/${rider.user_id}`)} is_active_path={`/riders/${rider.user_id}`} className="italic">{rider.first_name} {rider.last_name}</NavLink>
      <NavSeparator/>
      <NavLink onClick={() => router.push(`/riders/${rider.user_id}/trips`)} is_active_path={`/riders/${rider.user_id}/trips`} >Trips</NavLink>
    </RootNav>
  )
}
