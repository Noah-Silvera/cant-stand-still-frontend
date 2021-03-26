import { useEffect, useState } from "react";

export default function NavLink({ onClick = null, href = null, children = null, is_active_path = null, className = "" }) {
  const [is_active, setIsActive] = useState(false);

  useEffect(() => {
    if(window){
      setIsActive(window.location.pathname == is_active_path)
    }
  });

  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        block mt-4 lg:inline-block lg:mt-0 mr-4
         ${is_active ? "text-white": "text-teal-200 hover:text-white"}
         ${className}
      `}
    >
      {children}
    </a>
  )
}
