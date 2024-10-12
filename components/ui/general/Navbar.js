"use client";
import { GlobalContext } from "@/services/GlobalContext";
import { siteTitle } from "@/utils/content";
import { disableNavFooterForPaths } from "@/utils/disableNavFooter";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import DarkModeToggle from "../buttons/DarkModeToggle";
import { AccountDropdown } from "@/components/dropdowns/AccountDropdown";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const { user, logout } = useContext(GlobalContext);
  const path = usePathname();

  const toggleNavbar = () => {
    setIsNavbarHidden(!isNavbarHidden);
  };

  return (
    !(disableNavFooterForPaths.includes(path) || path.endsWith("read")) && (
      <nav className="bg-black w-full max-w-[1300px] mx-auto fixed top-2 left-1/2 transform -translate-x-1/2 z-50 rounded-lg shadow-lg px-4 sm:px-6">
        <div className="flex items-center justify-between py-4 px-4">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-xl font-bold">
              {siteTitle}
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <div className="sm:hidden">
              <div>
                <DarkModeToggle />
              </div>
            </div>
            <div className="sm:hidden">
              <Sidebar />
            </div>
          </div>
          <div className="hidden sm:flex sm:gap-2 ">
            <div className="flex">
              <div>
                <DarkModeToggle />
              </div>
            </div>
            <div>
              <div className="flex">
                <Link
                  href="/about"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
              </div>
            </div>
            <div>
              <div className="flex">
                <Link
                  href="/library"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Library
                </Link>
              </div>
            </div>
            <div>
              <div className="flex">
                <Link
                  href="/upload"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Upload
                </Link>
              </div>
            </div>
            {!!user ? (
              <div className="flex gap-2">
                <div className="hidden sm:block">
                  <AccountDropdown handleLogout={logout} />
                </div>
              </div>
            ) : (
              <>
                <div className="hidden sm:block">
                  <div className="flex">
                    <Link
                      href="/login"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="flex">
                    <Link
                      href="/signup"
                      className="text-gray-700 bg-white hover:bg-gray-500 hover:text-white px-4 py-2 rounded-md text-sm font-bold"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    )
  );
};

export default Navbar;
