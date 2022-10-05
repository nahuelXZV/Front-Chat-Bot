import Link from "next/link";
import { useAppContext } from "../context/LayoutContext";

export default function Aside() {
  const layotContext = useAppContext();

  let styleOpen = layotContext.isSidebarOpen
    ? "text-white bg-sky-700 fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform border-r shadow-lg lg:z-auto lg:static lg:shadow-none -translate-x-full lg:translate-x-0 lg:w-20"
    : "text-white bg-sky-700 fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform border-r shadow-lg lg:z-auto lg:static lg:shadow-none";

  let styleHeader = layotContext.isSidebarOpen
    ? "flex items-center justify-between flex-shrink-0 p-2 lg:justify-center"
    : "flex items-center justify-between flex-shrink-0 p-2";

  let styleHidden = layotContext.isSidebarOpen ? "lg:hidden" : "";

  let styleLink = layotContext.isSidebarOpen
    ? "flex items-center p-2 space-x-2 rounded-md hover:bg-sky-600 justify-center"
    : "flex items-center p-2 space-x-2 rounded-md hover:bg-sky-600";

  let opacity = layotContext.isSidebarOpen
    ? ""
    : "fixed inset-0 z-10 bg-black bg-opacity-20 lg:hidden";

  function toggle() {
    layotContext.toggleSidbarMenu();
  }

  return (
    <>
      <div className={opacity}></div>
      <aside className={styleOpen}>
        {/* sidebar header */}
        <div className={styleHeader}>
          <span className="p-2 text-lg font-bold leading-8 tracking-wider uppercase whitespace-nowrap">
            <Link href="/">
              <a href="/" className={styleHidden}>
                Veterinaria
              </a>
            </Link>
          </span>
          <button onClick={toggle} className="p-2 rounded-md lg:hidden">
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar links  */}
        <nav className="flex-1 ">
          <ul className="p-2">
            <li>
              <a href="/" className={styleLink}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>
                <span className={styleHidden}>Inicio</span>
              </a>
            </li>
          </ul>
          {/* Sidebar footer */}
          <div className="flex-shrink-0 p-2 border-t max-h-10 text-gray-900">
            <form method="POST" action="/">
              <button
                href="/"
                type="button"
                className="flex items-center justify-center w-full space-x-1 font-medium tracking-wider bg-white border rounded-md focus:outline-none focus:ring"
              >
                <span>
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </span>
                <span className={styleHidden}> Cerrar Sesión </span>
              </button>
            </form>
          </div>
        </nav>
      </aside>
    </>
  );
}
