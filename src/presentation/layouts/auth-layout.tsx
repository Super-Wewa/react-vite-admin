/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useRef, useState } from "react";
import { FaTimes, FaUser } from "react-icons/fa";
import SidebarLink from "../components/atoms/sidebar-link";
import { routes } from "../../config/routes";
import { MdDashboard } from "react-icons/md";
import { useOnClickOutside } from 'usehooks-ts'
import { ActionIcon } from "rizzui/action-icon";
import { CiMenuFries } from "react-icons/ci";
import { useAuthStore } from "../../store/auth-store";
import { IoLogOut } from "react-icons/io5";
import { TbBuildingEstate } from "react-icons/tb";
import { MdElectricBike } from "react-icons/md";

export default function AuthLayout({ children, title }: { children?: ReactNode, title?: string }) {
  const { user, clear } = useAuthStore()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sidebarRef = useRef(null)

  useOnClickOutside(sidebarRef as any, () => setIsOpen(false))

  const logout = () => {
    clear()
    window.location.replace(routes.index)
  }

  return (
    <>
      <div className="flex h-screen">
        {
          isOpen && (
            <div className="w-screen h-screen z-30 fixed top-0 left-0 bg-black bg-opacity-50"></div>
          )
        }
        <div
          className={`bg-gray-800 z-40 flex flex-col gap-10 text-white w-64 fixed h-full transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-64"}`}
          ref={sidebarRef}
        >
          <ActionIcon
            onClick={() => setIsOpen(false)}
            className="bg-white ml-auto text-gray-800 hover:bg-white hover:text-gray-800"
          >
            <FaTimes />
          </ActionIcon>
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-c-primary"></div>
            <p>
              {user?.name}
            </p>
          </div>
          <nav className="flex flex-col">
            <SidebarLink
              label="Dashboard"
              link={routes.index}
              icon={<MdDashboard />}
              strict
            />
            <SidebarLink
              label="Utilisateurs"
              link={routes.users}
              icon={<FaUser />}
            />
            <SidebarLink
              label="Courses"
              link={routes.trips}
              icon={<MdElectricBike />}
            />
            <SidebarLink
              label="Provinces"
              link={routes.provinces}
              icon={<TbBuildingEstate />}
            />
          </nav>
        </div>

        <div className="flex-1 flex-col ml-0 relative transition-all overflow-x-hidden">
          <div className="w-full sticky z-50 top-0 left-0 bg-white px-5 py-3 shadow-xl flex items-center justify-between">
            <div className="w-fit flex items-center gap-3">
              <ActionIcon onClick={() => setIsOpen(true)}>
                <CiMenuFries />
              </ActionIcon>
              <span>
                {title}
              </span>
            </div>
            <ActionIcon onClick={logout} color="danger">
              <IoLogOut />
            </ActionIcon>
          </div>
          <main className="p-5">{children}</main>
        </div>
      </div>
    </>
  );
}

