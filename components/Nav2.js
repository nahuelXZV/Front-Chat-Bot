import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../context/LayoutContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const layotContext = useAppContext();
  const [open, setOpen] = useState(false);
  const [usuario, setUser] = useState('');
  const [email, setEmail] = useState('');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  function localUser() {
    if (typeof window !== 'undefined') {
      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      return user.body.user.nomre;                
    }
  }

  function localEmail() {
    if (typeof window !== 'undefined') {
      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      return user.body.user.email;                
    }
  }

  useEffect(() => {
    setUser(local());
    setEmail(local2());
  }, []);


  function exit() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user");
      router.push("/login");
    }
  }

  function toggle() {
    layotContext.toggleSidbarMenu();
  }

  function toggleD() {
    setOpen(!open);
  }

  function handlerSearchOpen() {
    layotContext.setIsSettingsPanelOpen();
  }

  let styleOpen = layotContext.isSidebarOpen
    ? "w-5 h-5 text-gray-600"
    : "w-5 h-5 text-gray-600 transform transition-transform -rotate-180";

  let styleOpenD = open
    ? `absolute right-0 z-20 w-56 py-2 mt-2 mr-8 overflow-hidden bg-white rounded-md shadow-xl`
    : "hidden absolute right-0 z-20 w-56 py-2 mt-2 mr-8 overflow-hidden bg-white rounded-md shadow-xl";


  return (
    <header className="flex-shrink-0 border-b-2 bg-fondo p-1">
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
            onClick={toggle}          >
            <svg className={styleOpen} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="relative flex justify-center space-x-3 mr-8">
          <div className="relative">
            <button onClick={toggleD} className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-fondo border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300  focus:outline-none">
              <span className="mx-1 font-bold">{usuario}</span>
              <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={styleOpenD}>
        <button className="flex items-start p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform hover:bg-gray-100 ">
          <Image src="/images/user.png" alt="Picture of the author" width={35} height={35} className="flex-shrink-0 object-cover mr-4 rounded-full w-9 h-9" />
          <div className="mx-4 ml-2">
            <h1 className="text-sm font-semibold text-gray-700">{usuario}</h1>
            <p className="text-sm text-gray-500 ">{email}</p>
          </div>
        </button>
        <hr className="border-gray-200" />
        <button onClick={exit} className="block w-56 px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-100">
          Cerrar Sesion
        </button>
      </div>
    </header>
  );
}
