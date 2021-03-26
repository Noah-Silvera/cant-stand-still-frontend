import Nav from './Nav'
import NavLink from './NavLink'

export default function RootNav({ children }) {
  return (
    <Nav>
      <NavLink href="riders" is_active_path="/riders">Riders</NavLink>
      {children}
    </Nav>
  )
}
