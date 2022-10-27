import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../context/LayoutContext";

export default function Nav() {
  const layotContext = useAppContext();

  function toggle() {
    layotContext.toggleSidbarMenu();
  }
  function handlerSearchOpen() {
    layotContext.setIsSettingsPanelOpen();
  }

  let styleOpen = layotContext.isSidebarOpen
    ? "w-5 h-5 text-gray-600"
    : "w-5 h-5 text-gray-600 transform transition-transform -rotate-180";

  return (
    <header className="flex-shrink-0 border-b-2 bg-white p-1">
      <div className="flex items-center justify-between p-2">
        {/* Navbar left */}
        <div className="flex items-center">
          <Link href="/" className="lg:hidden">
            <a className="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden">
              Pizzaria
            </a>
          </Link>
          <button
            className="p-2 rounded-md focus:outline-none focus:ring text-gray-500"
            onClick={toggle}
          >
            <svg
              className={styleOpen}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile search box */}

        {/*Navbar right  */}
        <div className="relative flex items-center space-x-3">
          <div className="relative">
            <Link href="/">
              <a>
                <div className="flex items-center mr-10">
                  <div className="flex items-center">
                    <Image
                      src="/images/user.png"
                      alt="Picture of the author"
                      width={20}
                      height={20}
                      className="rounded-full w-8 h-auto"
                    />
                    <h3 className="font-bold ml-2"> Nahuel Zalazar </h3>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
