"use client";
import { disableNavFooterForPaths } from "@/utils/disableNavFooter";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const path = usePathname();

  return (
    !(disableNavFooterForPaths.includes(path) || path.endsWith("read")) && (
      <footer className="bg-black w-full max-w-[1300px] mx-auto rounded-lg shadow-lg px-4 sm:px-6 py-8 my-2">
        <div className="flex items-center justify-between py-4 px-4">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-xl font-bold">
              Ready
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div>
              <div className="flex space-x-4">
                <Link
                  href="/upload"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Upload a document
                </Link>
              </div>
            </div>
            <div>
              <div className="flex space-x-4">
                <Link
                  href="/about"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400 text-center pt-8">
          Built by{" "}
          <Link
            className="font-bold underline"
            href="https://github.com/Sumansourabh14"
            target="_blank"
          >
            Suman Sourabh
          </Link>
        </p>
        <p className="text-sm text-gray-400 text-center pt-8">
          &copy; <span id="year">{new Date().getFullYear()}</span> Ready. All
          rights reserved.
        </p>
      </footer>
    )
  );
};

export default Footer;
