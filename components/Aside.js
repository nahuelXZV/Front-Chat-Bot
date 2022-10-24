import Link from "next/link";
import { useAppContext } from "../context/LayoutContext";

export default function Aside() {
  const layotContext = useAppContext();

  let styleOpen = layotContext.isSidebarOpen
    ? "text-white bg-blue-900 fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-56 max-h-screen overflow-hidden transition-all transform border-r shadow-lg lg:z-auto lg:static lg:shadow-none -translate-x-full lg:translate-x-0 lg:w-20"
    : "text-white bg-blue-900 fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-56 max-h-screen overflow-hidden transition-all transform border-r shadow-lg lg:z-auto lg:static lg:shadow-none";

  let styleHeader = layotContext.isSidebarOpen
    ? "flex items-center justify-between flex-shrink-0 p-2 lg:justify-center"
    : "flex items-center justify-between flex-shrink-0 p-2";

  let styleHidden = layotContext.isSidebarOpen ? "lg:hidden" : "";

  let styleLink = layotContext.isSidebarOpen
    ? "flex items-center p-2 space-x-2 rounded-md hover:bg-blue-700 justify-center"
    : "flex items-center p-2 space-x-2 rounded-md hover:bg-blue-700";

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
                SISTEMA WEB
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
              <Link href="/">
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
              </Link>
            </li>
            <li>
              <Link href="/usuario">
                <a className={styleLink}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                  </span>
                  <span className={styleHidden}>Usuarios</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/tablero">
                <a className={styleLink}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                      />
                    </svg>
                  </span>
                  <span className={styleHidden}>Tablero</span>
                </a>
              </Link>
            </li>
          </ul>
          {/* Sidebar footer */}
          {/*           <div className="flex-shrink-0 p-2 border-t max-h-10 text-gray-900">
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
          </div> */}
        </nav>
      </aside>
    </>
  );
}
