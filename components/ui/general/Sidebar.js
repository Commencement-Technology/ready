import { AccountDropdown } from "@/components/dropdowns/AccountDropdown";
import { GlobalContext } from "@/services/GlobalContext";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";

const Sidebar = () => {
  const { user, logout } = useContext(GlobalContext);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-gray-500" />
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-2">
          <div>
            <div className="flex">
              <Link
                href="/about"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>
          <div>
            <div className="flex">
              <Link
                href="/library"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                Library
              </Link>
            </div>
          </div>
          <div>
            <div className="flex">
              <Link
                href="/upload"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                Upload
              </Link>
            </div>
          </div>
          {!!user ? (
            <div className="flex gap-2">
              <div>
                <AccountDropdown handleLogout={logout} />
              </div>
            </div>
          ) : (
            <>
              <div className="hidden sm:block">
                <div className="flex">
                  <Link
                    href="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex">
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-md text-sm font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
