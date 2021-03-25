export default function NavLink({ onClick = null, href = null, children = null }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        {children}
    </a>
  )
}
