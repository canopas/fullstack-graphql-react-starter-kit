import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  faFileCirclePlus,
  faPenClip,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-20 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 text-xl font-bold text-white lg:py-6.5">
        OmniDashboard
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}

              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-lightGrayBlue duration-300 ease-in-out hover:bg-graydark dark:hover:bg-darkGrayBlue ${
                    pathname.includes("profile") &&
                    "bg-graydark dark:bg-darkGrayBlue"
                  }`}
                >
                  <FontAwesomeIcon icon={faUserGroup} />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/business-details"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-lightGrayBlue duration-300 ease-in-out hover:bg-graydark dark:hover:bg-darkGrayBlue ${
                    pathname.includes("profile") &&
                    "bg-graydark dark:bg-darkGrayBlue"
                  }`}
                >
                  <FontAwesomeIcon icon={faPenClip} />
                  Business details
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-lightGrayBlue duration-300 ease-in-out hover:bg-graydark dark:hover:bg-darkGrayBlue ${
                    pathname.includes("profile") &&
                    "bg-graydark dark:bg-darkGrayBlue"
                  }`}
                >
                  <FontAwesomeIcon icon={faFileCirclePlus} />
                  Categories
                </NavLink>
              </li>
              {/* <!-- Menu Item Dashboard --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
