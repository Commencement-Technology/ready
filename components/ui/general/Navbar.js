"use client";
import { GlobalContext } from "@/services/GlobalContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { Button } from "../button";
import { disableNavFooterForPaths } from "@/utils/disableNavFooter";
import { siteTitle } from "@/utils/content";
import DarkModeToggle from "../buttons/DarkModeToggle";

const Navbar = () => {
  const { user, logout } = useContext(GlobalContext);
  const path = usePathname();

  return (
    !(disableNavFooterForPaths.includes(path) || path.endsWith("read")) && (
      <nav className="bg-black w-full max-w-[1200px] mx-auto fixed top-2 left-1/2 transform -translate-x-1/2 z-50 rounded-lg shadow-lg px-4 sm:px-6">
        <div className="flex items-center justify-between py-4 px-4">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-xl font-bold">
              {siteTitle}
            </Link>
          </div>
          <div className="flex gap-2">
            <div className="hidden sm:block">
              <div className="flex">
                <DarkModeToggle />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex">
                <Link
                  href="/about"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex">
                <Link
                  href="/library"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Library
                </Link>
              </div>
            </div>
            <div className="hidden sm:block">
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
                  <div className="flex">
                    <Button
                      onClick={logout}
                      className="text-gray-100 bg-red-700 hover:bg-red-900 font-medium"
                    >
                      Logout
                    </Button>
                  </div>
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
