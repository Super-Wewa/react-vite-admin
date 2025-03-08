import { ReactNode, useMemo } from "react"
import { Link } from "react-router-dom"

export default function SidebarLink({
  label,
  icon,
  strict,
  link
}: {
  label: string
  icon: ReactNode
  strict?: boolean
  link: string
}) {
  const currentPath = window.location.pathname
  const isCurrent = useMemo(() => {
    if (strict) return link == currentPath
    return currentPath.includes(link)
  }, [currentPath, link, strict])

  return (
    <Link to={link} className={`w-full py-2 px-5 transition-all duration-200 flex items-center gap-2 ${isCurrent ? 'bg-white text-gray-800' : 'bg-transparent'}`}>
      {icon}
      <span>
        {label}
      </span>
    </Link>
  )
}