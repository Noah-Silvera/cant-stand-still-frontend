import Nav from './Nav'
import NavLink from './NavLink'
import { useRouter } from 'next/router'

export default function RootNav({ children = [] }) {
  const router = useRouter()

  return (
    <Nav>
      <NavLink onClick={() => router.push(`/riders`)} is_active_path="/riders">Riders</NavLink>
      {children}
    </Nav>
  )
}
